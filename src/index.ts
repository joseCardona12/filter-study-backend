import express, {Express} from "express";
import Util from "./utils/util";
import { configDotenv } from "dotenv";
import router from "./routes/route";
import "./config/container";
import cors from "cors";

configDotenv();
const PORT:number = parseInt(process.env.PORT as string);
const app:Express = express();
app.use(cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());
app.use("/api",router);

Util.startServer(PORT, app);
