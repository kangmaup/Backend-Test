import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { GlobalModule } from './global/global.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { SeederModule } from './seeder/seeder.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [GlobalModule, BooksModule, MembersModule, BorrowingModule, SeederModule, AuthModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
