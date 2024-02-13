import { JwtService } from "./JwtService";
import { User } from "@/domain/entities";
import { GenericRepository } from "@/infrastructure/repositories";
import bcrypt from "bcryptjs";

export class AuthService {
    constructor(
        private userRepository: GenericRepository<User>,
        private jwtService: JwtService
    ) {}

    async signup(userData: { email: string; password: string }) {
        const userExists = await this.userRepository.findOne({
            email: userData.email,
        });
        if (userExists) throw new Error("400::User already exists");
        const newUser = await this.userRepository.create(userData);
        return newUser;
    }

    async login(loginCredentials: { email: string; password: string }) {
        const { email, password } = loginCredentials;
        const user = await this.userRepository.findOne({ email });
        if (!user) throw new Error("404::User not found");
        if (!(await bcrypt.compare(password, user.password)))
            throw new Error("400::Invalid credentials");
        const accessToken = this.jwtService.createAccessToken(user.id);
        const refreshToken = this.jwtService.createRefreshToken(user.id);

        const response = { ...user, refreshToken, accessToken };
        return response;
    }

    exchangeRefreshTokenForAccessToken(refreshToken: string) {
        const accessToken =
            this.jwtService.exchangeRefreshTokenForAccess(refreshToken);
        return accessToken;
    }
}
