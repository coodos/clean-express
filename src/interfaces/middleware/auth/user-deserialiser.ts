import { JwtService } from "@/application/services";
import { User } from "@/domain/entities";
import { getRepository } from "@/infrastructure/repositories";
import { NextFunction, Request, Response } from "express";

export async function userDeserializer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const jwtService = new JwtService();
    const accessToken = req.headers.authorization?.split("Bearer ")[1];
    if (!accessToken) return next();
    const payload = jwtService.decodeToken(accessToken);
    const userRepository = getRepository(User);
    const user = await userRepository.findById(payload.userId);
    req.user = user;
    return next();
}
