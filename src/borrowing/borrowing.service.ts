import {
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { Repository } from 'typeorm';
import {
  MembersEntity,
  statusMember,
} from 'src/members/entities/member.entity';
import { BooksEntity } from 'src/books/entities/book.entity';
import { BorrowingEntity } from './entities/borrowing.entity';

@Injectable()
export class BorrowingService {
  constructor(
    @Inject('MEMBERS_REPOSITORY')
    private readonly memberRepo: Repository<MembersEntity>,
    @Inject('BOOKS_REPOSITORY')
    private readonly bookRepo: Repository<BooksEntity>,
    @Inject('BORROWING_REPOSITORY')
    private readonly borrowingepo: Repository<BorrowingEntity>,
  ) {}

  async validateMember(userId: string) {
    const queryFindMember = await this.memberRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!queryFindMember) {
      throw new NotFoundException('User does not exist');
    }

    if (queryFindMember.status === statusMember.penalized) {
      throw new ForbiddenException('User is currently penalized.');
    }

    return queryFindMember;
  }

  async validateBook(code: string) {
    const queryFindBook = await this.bookRepo.findOne({
      where: {
        code: code,
      },
    });

    if (!queryFindBook) {
      throw new NotFoundException('Book does not exist');
    }

    if (queryFindBook.stock > 0) {
      throw new ForbiddenException('Book is out of stock.');
    }

    return queryFindBook;
  }

  async create(userId: string, createBorrowingDto: CreateBorrowingDto) {
    const validateMember = await this.validateMember(userId);
    const validateBook = await this.validateBook(createBorrowingDto.code);
    
    const createBorrowing = await this.borrowingepo
      .create({
        book_id: validateBook.id,
        member_id: validateMember.id,
      })
      .save();

    validateBook.stock = Number(validateBook.stock) - 1;
    await validateBook.save();
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: {
        id : createBorrowing.id
      },
    };
  }

  findAll() {
    return `This action returns all borrowing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowing`;
  }

  update(id: number, updateBorrowingDto: UpdateBorrowingDto) {
    return `This action updates a #${id} borrowing`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowing`;
  }
}
