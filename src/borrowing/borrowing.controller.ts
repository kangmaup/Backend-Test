import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { TokenAccessGuard } from '../common/guard/token-access.guard';
import { UserId } from '../common/decorator/UserId';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @UseGuards(TokenAccessGuard)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() createBorrowingDto: CreateBorrowingDto,
  ) {
    return this.borrowingService.create(userId, createBorrowingDto);
  }

  @UseGuards(TokenAccessGuard)
  @Post('returned')
  async createReturned(
    @UserId() userId: string,
    @Body() createBorrowingDto: CreateBorrowingDto,
  ) {
    return await this.borrowingService.createReturned(
      userId,
      createBorrowingDto,
    );
  }

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.borrowingService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateBorrowingDto: UpdateBorrowingDto,
  ) {
    return this.borrowingService.update(+id, updateBorrowingDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(+id);
  }
}
