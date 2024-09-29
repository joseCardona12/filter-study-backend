import { container } from "tsyringe";
import AuthService from "../services/authService";
import AuthRepository from "../repositories/authRepository";
container.registerSingleton<AuthService>(AuthService);
container.registerSingleton<AuthRepository>(AuthRepository);