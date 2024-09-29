import {injectable } from "tsyringe";
import UserModel from "../models/userModel";
import { IUser } from "../interfaces/userInterface";

@injectable()
export default class AuthRepository{
    async login(user:Partial<IUser>):Promise<IUser | {message:string} | null>{
        try{
            const {email,password} = user;
            return await UserModel.findOne({
                where:{email,password}
            });
        }catch(error:unknown){
            return ({message: "Error with the model"})
        }
    }
    async getUserByEmail(email:string):Promise<IUser | {message:string} | null>{
        try{
            return await UserModel.findOne({
                where:{email}
            })
        }catch(error:unknown){
            return ({message: "Error with the model"});
        }
    }

    async register(user:Partial<IUser>):Promise<IUser | {message: string} | null>{
        try{
            return await UserModel.create(user);
        }catch(error:unknown){
            return ({message: "Error with the model"});
        }
    }
}