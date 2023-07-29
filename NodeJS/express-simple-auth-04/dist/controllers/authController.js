"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Role_js_1 = __importDefault(require("../models/Role.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const generateAccessToken = (userId, userRoles) => {
    const payload = {
        id: userId,
        roles: userRoles
    };
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('Secret key is not defined');
    }
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '24h' });
};
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array());
                }
                const { username, password } = req.body;
                const candidateUser = yield User_js_1.default.findOne({ username });
                if (candidateUser) {
                    return res.status(400).json({ message: `User ${username} already exists` });
                }
                const hashedPassword = bcryptjs_1.default.hashSync(password, 7);
                const userRole = yield Role_js_1.default.findOne({ value: 'USER' });
                const newUser = new User_js_1.default({
                    username,
                    password: hashedPassword,
                    roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value]
                });
                const createdUser = yield newUser.save();
                return res.json(createdUser);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: e.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User_js_1.default.findOne({ username });
                if (!user) {
                    return res.status(400).json({ message: `User ${username} not found` });
                }
                const isPasswordValid = bcryptjs_1.default.compareSync(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({ message: `Invalid password` });
                }
                const token = generateAccessToken(user._id.toString(), user.roles);
                return res.json({ token });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: e.message });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_js_1.default.find();
                res.json(users);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: e.message });
            }
        });
    }
}
exports.default = new AuthController();
