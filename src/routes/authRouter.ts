import { Router } from "express";
import AuthController from "../controllers/authController";
import { authenticateToken } from "../middlewares/middleware";
import { Request,Response } from "express";

const authRouter:Router = Router();
authRouter.post("/login",AuthController.login);
authRouter.post("/register", AuthController.register);

//Protected routes 
authRouter.get("/dashboard", authenticateToken,(req:Request,res:Response)=>{
    res.json({
        message: "This is view protected",
    })
})
export default authRouter;