import { Express } from "express";
import sequelize from "../config/db";

export default class Util{
    static async startServer(PORT:number, app: Express):Promise<void>{
        try{
            await sequelize.authenticate();
            console.log("Trying connect with the database");
            await sequelize.sync(); // Try 
            console.log("Sync and migrations with the database correctly");
            app.listen(PORT, ()=>console.log(`Server running on the port ${PORT}`))
            
        }catch(error:unknown){
            console.log({message: "Error with the method startServer", error});
        }
    }

    static verifyData(...fields:(number | string)[]):boolean{
        return fields.every(field => field);
    }
}