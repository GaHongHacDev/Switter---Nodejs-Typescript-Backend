"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("~/constants/enums");
class User {
    _id;
    name;
    email;
    date_of_birth;
    password;
    created_at;
    updated_at;
    email_verify_token;
    forgot_password_token;
    verify;
    bio;
    location;
    website;
    username;
    avatar;
    cover_photo;
    constructor(user) {
        const date = new Date();
        this._id = user._id;
        this.name = user.name || '';
        this.email = user.email;
        this.date_of_birth = user.date_of_birth || new Date();
        this.password = user.password;
        this.created_at = user.created_at || date;
        this.updated_at = user.updated_at || date;
        this.email_verify_token = user.email_verify_token || '';
        this.forgot_password_token = user.forgot_password_token || '';
        this.verify = user.verify || enums_1.UserVerifyStatus.Unverified;
        this.bio = user.bio || '';
        this.location = user.location || '';
        this.website = user.website || '';
        this.username = user.username || '';
        this.avatar = user.avatar || '';
        this.cover_photo = user.cover_photo || '';
    }
}
exports.default = User;
