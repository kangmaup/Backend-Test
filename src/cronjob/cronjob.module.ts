import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CronjobController } from './cronjob.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/database/database.module';
import { memberProviders } from 'src/members/members.provider';
import { booksProviders } from 'src/books/books.provider';
import { borrowingProviders } from 'src/borrowing/borrowing.provider';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule],
  controllers: [CronjobController],
  providers: [
    CronjobService,
    ...memberProviders,
    ...booksProviders,
    ...borrowingProviders,
  ],
})
export class CronjobModule {}
