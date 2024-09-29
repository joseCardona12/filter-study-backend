import { Request, Response } from "express"
import Util from "../utils/util";
import { container } from "tsyringe";
import AuthService from "../services/authService";
import { IUser } from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
export default class AuthController{
    static async login(req:Request, res:Response):Promise<void>{
        const {email,password} = req.body;
        const dataVerify:boolean = Util.verifyData(email,password);
        if(!dataVerify){
            res.status(400).json({message: "Is required all body"});
            return;
        };
        const authService = container.resolve(AuthService);
        const user = await authService.login({email,password});
        if(!user){
            res.status(401).json({message: "Error with the credentials"});
            return;
        };
        if("message" in user){
            res.status(500).json(user);
            return;
        };
        const tokenGenerate:string = AuthController.generateToken({email});
        res.header("Authorization", tokenGenerate).status(200).json({
            message: "Authenticated user",
            token:tokenGenerate 
        })
    }

    static async register(req:Request, res:Response):Promise<void>{
        const {name,email,password} = req.body;
        const dataVerify:boolean = Util.verifyData(name,email,password);
        if(!dataVerify){
            res.status(400).json({message: "Is required all body"});
            return;
        }
        const authService = container.resolve(AuthService);
        const user = await authService.register({name,email,password});
        if(!user){
            res.status(401).json({message: "User exists"});
            return;
        }
        if("message" in user){
            res.status(500).json(user);
            return;
        }
        const tokenGenerate:string = AuthController.generateToken({name,email});
        res.header("Authorization", tokenGenerate).status(200).json({
            message: "Authenticated user",
            token:tokenGenerate 
        });
    }

    static generateToken(user:Partial<IUser>):string{
        return jwt.sign(user,process.env.SECRET!, {expiresIn: "1h"});
    }

}