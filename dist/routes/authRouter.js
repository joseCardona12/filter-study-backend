"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const middleware_1 = require("../middlewares/middleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", authController_1.default.login);
authRouter.post("/register", authController_1.default.register);
//Protected routes 
authRouter.get("/dashboard", middleware_1.authenticateToken, (req, res) => {
    res.json({
        message: "This is view protected",
    });
});
exports.default = authRouter;
