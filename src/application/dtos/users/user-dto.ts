import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UserDTO {
    @Expose()
    @IsNumber()
    id: string;

    @Expose()
    @IsString()
    email: string;

    @Expose()
    @IsString()
    name: string;
}
