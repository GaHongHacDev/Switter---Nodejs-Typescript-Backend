"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_schemas_1 = __importDefault(require("~/models/schema/User.schemas"));
const database_services_1 = __importDefault(require("./database.services"));
const cripto_1 = require("~/utils/cripto");
const jwt_1 = require("~/utils/jwt");
const enums_1 = require("~/constants/enums");
class UsersService {
    async signAccessToken(userId) {
        return await (0, jwt_1.signToken)({
            payload: { userId, token: enums_1.TokenTypes.AccessToken },
            options: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        });
    }
    async signRefreshToken(userId) {
        return await (0, jwt_1.signToken)({
            payload: { userId, token: enums_1.TokenTypes.RefreshToken }
        });
    }
    async register(payload) {
        const result = await database_services_1.default.users.insertOne(new User_schemas_1.default({
            ...payload,
            date_of_birth: new Date(payload.date_of_birth),
            password: (0, cripto_1.hashPassword)(payload.password)
        }));
        const user_id = result.insertedId.toString();
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshToken(user_id)
        ]);
        return { accessToken, refreshToken };
    }
    async checkEmailExist(email) {
        const user = await database_services_1.default.users.findOne({ email });
        return Boolean(user);
    }
}
const userService = new UsersService();
exports.default = userService;
