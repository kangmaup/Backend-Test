import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { DatabaseModule } from 'src/database/database.module';
import { memberProviders } from './members.provider';
import { borrowingProviders } from 'src/borrowing/borrowing.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [MembersController],
  providers: [MembersService, ...memberProviders,...borrowingProviders],
})
export class MembersModule {}
