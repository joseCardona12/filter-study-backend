import { IJwtPayload } from "./interfaces/jwtInterface";
import { IUser } from "./interfaces/userInterface";

declare global{
    namespace Express{
        interface Request{
            user?:Partial<IUser>
        }
    }
}