import { Expose } from "class-transformer";
import { UserDTO } from "./user-dto";

export class TokenResponseDTO extends UserDTO {
    @Expose()
    refreshToken: string;

    @Expose()
    accessToken: string;
}
