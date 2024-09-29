"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = __importDefault(require("./utils/util"));
const dotenv_1 = require("dotenv");
const route_1 = __importDefault(require("./routes/route"));
require("./config/container");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.configDotenv)();
const PORT = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3001", "https://filter-study-frontend.vercel.app/"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api", route_1.default);
util_1.default.startServer(PORT, app);
