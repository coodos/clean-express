import { Request, Response, NextFunction } from "express";

export function IsAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) throw new Error("401::Unauthenticated");
    return next();
}
