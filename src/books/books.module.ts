import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { booksProviders } from './books.provider';
import { DatabaseModule } from 'src/database/database.module';
import { borrowingProviders } from 'src/borrowing/borrowing.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService,...booksProviders,...borrowingProviders],
})
export class BooksModule {}
