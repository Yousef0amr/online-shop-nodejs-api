import { Router } from "express";
import validateRequset from "../middlewares/validateRequest.js";
import { changePasswordSchema, checkEmailSchema, loginSchema, refreshSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "../validators/auth.validator.js";
import { login, refresh, register, checkEmail, verifyEmail, changePassword, forgetPassword, restPassword, resendCode } from "../controllers/auth.controller.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { updateUserSchema } from "../validators/user.validator.js";

const userRouter = Router()


userRouter.post('/register', validateRequset(registerSchema), register)
userRouter.post('/login', validateRequset(loginSchema), login)
userRouter.post('/refresh', validateRequset(refreshSchema), refresh)
userRouter.post('/check-email', validateRequset(checkEmailSchema), checkEmail)
userRouter.post('/verify-email', validateRequset(verifyEmailSchema), verifyEmail)
userRouter.post('/change-password', validateRequset(changePasswordSchema), changePassword)
userRouter.post('/forget-password', validateRequset(checkEmailSchema), forgetPassword)
userRouter.post('/reset-password', validateRequset(resetPasswordSchema), restPassword)
userRouter.post('/resend-code', validateRequset(checkEmailSchema), resendCode)
userRouter.get('/', getAllUsers)
userRouter.route('/current-user')
    .get(getUser)
    .patch(validateRequset(updateUserSchema), updateUser)
    .delete(deleteUser)


export default userRouter