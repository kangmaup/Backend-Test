import { Inject, Injectable } from '@nestjs/common';
import { CreateCronjobDto } from './dto/create-cronjob.dto';
import { UpdateCronjobDto } from './dto/update-cronjob.dto';
import { Between, Repository } from 'typeorm';
import { MembersEntity, statusMember } from 'src/members/entities/member.entity';
import { BooksEntity } from 'src/books/entities/book.entity';
import { BorrowingEntity } from 'src/borrowing/entities/borrowing.entity';
import * as moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobService {
  constructor(
    @Inject('MEMBERS_REPOSITORY')
    private readonly memberRepo: Repository<MembersEntity>,
    @Inject('BOOKS_REPOSITORY')
    private readonly bookRepo: Repository<BooksEntity>,
    @Inject('BORROWING_REPOSITORY')
    private readonly borrowingRepo: Repository<BorrowingEntity>,
  ) {}
  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handlePenalized() {
    const currentDate = moment()
    const dueDateMonthly = moment(currentDate).subtract(3, 'days');
    const startDate = moment(dueDateMonthly).startOf('day').toDate();
    const endDate = moment(dueDateMonthly).endOf('day').toDate();
    const queryMember = await this.memberRepo.find({
      where:{
        status: statusMember.penalized,
        updated_at: Between(startDate,endDate)
      }
    })
    
    const memberIds = queryMember.map((item)=>item.id)
    
    await this.memberRepo.createQueryBuilder()
    .update()
    .set({ status: statusMember.active })
    .whereInIds(memberIds)               
    .execute();
 

    console.log('Cronjob Successfully')
  }
}
