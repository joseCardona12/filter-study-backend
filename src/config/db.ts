import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/userModel";
import ProductModel from "../models/productModel";
import StockModel from "../models/stockModel";
import { configDotenv } from "dotenv";

configDotenv();

const sequelize:Sequelize = new Sequelize({
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT!),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    models: [UserModel, ProductModel,StockModel]
});


export default sequelize;