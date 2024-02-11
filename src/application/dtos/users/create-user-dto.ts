import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsString()
    name: string;
}
