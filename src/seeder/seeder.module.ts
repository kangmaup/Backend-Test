import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { DatabaseModule } from 'src/database/database.module';
import { memberProviders } from 'src/members/members.provider';
import { booksProviders } from 'src/books/books.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [SeederController],
  providers: [SeederService,...memberProviders,...booksProviders],
})
export class SeederModule {}
