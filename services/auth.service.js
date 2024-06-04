import model from "../models/index.js"
import ApiError from "../utils/apiResponse.js"
import otpService from "../utils/otpService.js"
import sendVerificationEmail from './../utils/emailService.js'
import jwt from "jsonwebtoken";

const User = model.User


const register = async (registerDto) => {
    const isExist = await User.findOne({ where: { email: registerDto.email } })
    if (isExist) {
        return new ApiError('User already registered', 400);
    }

    const user = await User.create(registerDto);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
}


const login = async (loginDto) => {
    const { email, password } = loginDto;
    const user = await User.findOne({ where: { email } })

    if (!user) {
        return new ApiError('User not registered', 404);
    }

    const isPasswordValid = user.verifyPassword(password);
    if (!isPasswordValid) {
        return new ApiError('Invalid password', 400);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
}


const refresh = async (refreshToken) => {

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(payload.user_id);
    if (!user || user.refreshToken !== refreshToken) {
        return new ApiError('Invalid refresh token', 400);
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };

};


const sendCode = async (email) => {

    const otpSecret = otpService.generateOtpSecret();

    const otp = otpService.generateOTP(otpSecret);

    const messageInfo = await sendVerificationEmail(email, otp)

    return { messageInfo, otpSecret }
};



const checkEmail = async (email) => {

    const user = await User.findOne({ where: { email } })
    if (user) {
        return new ApiError('User already registered', 400)
    }
    const info = await sendCode(email)
    if (!info.messageInfo)
        return new ApiError('failed to send message')

    return { secret: info.otpSecret }
}

const verifyEmail = async ({ secret, token }) => {

    const isVerified = otpService.verifyOTP(secret, token)
    if (!isVerified)
        return new ApiError('email not verified', 400)

    return isVerified
}


const forgetPassword = async (email) => {
    const isEmailExist = await User.findOne({ where: { email } })
    if (!isEmailExist) {
        return new ApiError("Email not registered", 404)
    }
    const info = await sendCode(email)
    if (!info.messageInfo) {
        return new ApiError('failed to send message', 400)
    }

    return { secret: info.otpSecret }
}

const changePassword = async ({ oldPassword, newPassword }, id) => {
    const user = await User.findByPk(id)
    const isValid = user.verifyPassword(oldPassword)
    if (!isValid) {
        return new ApiError("Invalid password", 400)
    }

    await user.updatePassword(newPassword)

    return isValid
}

const restPassword = async ({ email, newPassword }) => {
    const user = await authService.checkUserByEmail(email)
    if (!user)
        return new ApiError("Email not registered", 404)
    return await user.updatePassword(newPassword)
}


const authService = {
    register,
    login,
    refresh,
    sendCode,
    checkEmail,
    verifyEmail,
    forgetPassword,
    changePassword,
    restPassword
}




export default authService
