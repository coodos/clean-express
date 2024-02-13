import { User } from "@/domain/entities";

declare global {
    namespace Express {
        interface IUser extends User {}

        interface Request {
            user?: IUser;
            rawBody: Buffer;
        }
    }
}
