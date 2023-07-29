"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json('Not authorized');
        }
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json('Server error...');
        }
        const decodedData = jsonwebtoken_1.default.verify(token, secretKey);
        //@ts-ignore
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json('Not authorized');
    }
};
exports.default = authMiddleware;
