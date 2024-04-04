import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { borrowingProviders } from './borrowing.provider';
import { DatabaseModule } from 'src/database/database.module';
import { memberProviders } from 'src/members/members.provider';
import { booksProviders } from 'src/books/books.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BorrowingController],
  providers: [
    BorrowingService,
    ...borrowingProviders,
    ...memberProviders,
    ...booksProviders,
  ],
})
export class BorrowingModule {}
