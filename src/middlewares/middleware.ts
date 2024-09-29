import { Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { IJwtPayload } from "../interfaces/jwtInterface";
import { IUser } from "../interfaces/userInterface";

configDotenv();
export const authenticateToken = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({message: "Token not provided"});
        return;
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET!, (error)=>{
        if(error){
            res.status(403).json({message: "Invalid token"});
            return;
        }
        next();
    })

}