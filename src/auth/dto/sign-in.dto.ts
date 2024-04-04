import { IsNotEmpty } from "class-validator";

export class SignInDTO {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    password: string;
}