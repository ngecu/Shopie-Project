"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object({
    name: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string(),
    confirm_password: joi_1.default.string(),
});
exports.userLoginValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2, tlds: {
            allow: ['ke', 'com']
        }
    }),
    password: joi_1.default.string().required()
});
