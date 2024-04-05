import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBorrowingDto {
    @ApiProperty({description:'Code Book'})
    @IsNotEmpty()
    code: string
}
