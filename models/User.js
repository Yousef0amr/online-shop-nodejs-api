import jwt from "jsonwebtoken";
import { Model, DataTypes, UUIDV4 as uuidv4 } from "sequelize";
import bcrypt from 'bcrypt'

class User extends Model {
    generateAccessToken() {
        return jwt.sign({ user_id: this.user_id, role: this.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });//for prod 15m
    }

    generateRefreshToken() {
        return jwt.sign({ user_id: this.user_id, role: this.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }

    verifyPassword(password) {
        return bcrypt.compare(password, this.password)
    }

    async updatePassword(password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(password, salt);
        return await this.save();
    }
}


const UserModel = (db) => User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            indexes: [{ unique: true }]
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            defaultValue: 'User',
            values: ['User', 'Admin']
        },
        phone_number: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: db,
        modelName: "users",
        hooks: {
            beforeCreate: async (user) => {
                if (!user.user_id) {
                    user.user_id = uuidv4();
                }
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
)


export default UserModel