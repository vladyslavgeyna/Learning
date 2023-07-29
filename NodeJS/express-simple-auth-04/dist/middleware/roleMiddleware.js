"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roleMiddleware = (roles) => (req, res, next) => {
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
        //@ts-ignore
        const { roles: userRoles } = jsonwebtoken_1.default.verify(token, secretKey);
        let hasRole = false;
        userRoles.forEach((role) => {
            if (roles.includes(role)) {
                hasRole = true;
            }
        });
        if (!hasRole) {
            return res.status(403).json('Not authorized');
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json('Not authorized');
    }
};
exports.default = roleMiddleware;
