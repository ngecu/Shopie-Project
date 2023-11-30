"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetpassword = exports.validateUserEmail = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUserEmail = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
});
exports.validateResetpassword = joi_1.default.object().keys({
    user_id: joi_1.default.string().min(8).required(),
    password: joi_1.default.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")),
});
