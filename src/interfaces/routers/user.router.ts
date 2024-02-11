import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import { AuthService, JwtService } from "@/application/services";
import { User } from "@/domain/entities";
import { getRepository } from "@/infrastructure/repositories/repository-factory";
import { UseRequestDto, UseResponseDto } from "../middleware";
import {
    CreateUserDTO,
    UserDTO,
    LoginUserDTO,
    TokenResponseDTO,
} from "@/application/dtos/users";

const router = Router();

const userRepository = getRepository(User);
const authService = new AuthService(userRepository, new JwtService());

const usersController = new UsersController(authService);

router
    .route("/")
    .post(
        UseRequestDto(CreateUserDTO),
        UseResponseDto(UserDTO),
        usersController.signupUser
    );
router
    .route("/login")
    .post(
        UseRequestDto(LoginUserDTO),
        UseResponseDto(TokenResponseDTO),
        usersController.loginUser
    );

export default router;
