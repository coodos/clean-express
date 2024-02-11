import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";

export function AppInterceptor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const transmitJson = res.json;
    res.json = function (body) {
        if (res.locals.responseDTO) {
            body = plainToInstance(res.locals.responseDTO, body, {
                excludeExtraneousValues: true,
            });
        }
        return transmitJson.call(this, body);
    };
    next();
}
