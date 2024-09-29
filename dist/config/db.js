"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const userModel_1 = __importDefault(require("../models/userModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const stockModel_1 = __importDefault(require("../models/stockModel"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    models: [userModel_1.default, productModel_1.default, stockModel_1.default]
});
exports.default = sequelize;
