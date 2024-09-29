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
const util_1 = __importDefault(require("../utils/util"));
const tsyringe_1 = require("tsyringe");
const authService_1 = __importDefault(require("../services/authService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const dataVerify = util_1.default.verifyData(email, password);
            if (!dataVerify) {
                res.status(400).json({ message: "Is required all body" });
                return;
            }
            ;
            const authService = tsyringe_1.container.resolve(authService_1.default);
            const user = yield authService.login({ email, password });
            if (!user) {
                res.status(401).json({ message: "Error with the credentials" });
                return;
            }
            ;
            if ("message" in user) {
                res.status(500).json(user);
                return;
            }
            ;
            const tokenGenerate = AuthController.generateToken({ email });
            res.header("Authorization", tokenGenerate).status(200).json({
                message: "Authenticated user",
                token: tokenGenerate
            });
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const dataVerify = util_1.default.verifyData(name, email, password);
            if (!dataVerify) {
                res.status(400).json({ message: "Is required all body" });
                return;
            }
            const authService = tsyringe_1.container.resolve(authService_1.default);
            const user = yield authService.register({ name, email, password });
            if (!user) {
                res.status(401).json({ message: "User exists" });
                return;
            }
            if ("message" in user) {
                res.status(500).json(user);
                return;
            }
            const tokenGenerate = AuthController.generateToken({ name, email });
            res.header("Authorization", tokenGenerate).status(200).json({
                message: "Authenticated user",
                token: tokenGenerate
            });
        });
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign(user, process.env.SECRET, { expiresIn: "1h" });
    }
}
exports.default = AuthController;
