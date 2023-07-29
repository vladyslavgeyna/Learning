"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = __importDefault(require("../controllers/authController"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', [
    (0, express_validator_1.check)('username', 'Username is required').notEmpty(),
    (0, express_validator_1.check)('password', 'Password should have at least 4 symbols').isLength({ min: 4 })
], authController_1.default.register);
authRouter.post('/login', authController_1.default.login);
authRouter.get('/users', (0, roleMiddleware_1.default)(['USER']), authController_1.default.getUsers);
exports.default = authRouter;
