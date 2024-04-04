import { IsOptional } from 'class-validator';
import { RequestPaginationDto } from 'src/common/dto/pagination.dto';

export class GetListBookDto extends RequestPaginationDto {
  @IsOptional()
  title: string;
}
