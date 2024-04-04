import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { TokenAccessGuard } from 'src/common/guard/token-access.guard';
import { UserId } from 'src/common/decorator/UserId';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @UseGuards(TokenAccessGuard)
  @Post()
  create(@UserId() userId: string ,@Body() createBorrowingDto: CreateBorrowingDto) {
    return this.borrowingService.create(userId,createBorrowingDto);
  }

  @Get()
  findAll() {
    return this.borrowingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowingDto: UpdateBorrowingDto) {
    return this.borrowingService.update(+id, updateBorrowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(+id);
  }
}
