import { inject, injectable } from "tsyringe";
import AuthRepository from "../repositories/authRepository";
import { IUser } from "../interfaces/userInterface";

@injectable()
export default class AuthService{
    constructor(@inject(AuthRepository) private authRepository:AuthRepository){}
    async login(user:Partial<IUser>):Promise<IUser | null | {message: string}>{
        return await this.authRepository.login(user);
    }

    async register(user:Partial<IUser>):Promise<IUser | undefined | null | {message: string}>{
        const {email} = user;
        const userFound = await this.authRepository.getUserByEmail(email!);
        if(userFound)return;
        return await this.authRepository.register(user);
    }
}

