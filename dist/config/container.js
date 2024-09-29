"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const authService_1 = __importDefault(require("../services/authService"));
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
tsyringe_1.container.registerSingleton(authService_1.default);
tsyringe_1.container.registerSingleton(authRepository_1.default);
