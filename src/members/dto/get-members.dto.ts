import { IsOptional } from "class-validator";
import { RequestPaginationDto } from "src/common/dto/pagination.dto";

export class GetListMemberDto extends RequestPaginationDto {
    @IsOptional()
    code: string;

    @IsOptional()
    name: string;
  }