import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';
import { MembersEntity } from '../members/entities/member.entity';
import { BooksEntity } from '../books/entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForbiddenException, HttpStatus, NotFoundException } from '@nestjs/common';
import { memberProviders } from '../members/members.provider';
import { booksProviders } from '../books/books.provider';
import { borrowingProviders } from './borrowing.provider';
import { DatabaseModule } from '../database/database.module';
import { Repository } from 'typeorm';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';

describe('BorrowingController', () => {
  let controller: BorrowingController;
  let service: BorrowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[DatabaseModule],
      providers: [
        BorrowingService,
        {
          provide: getRepositoryToken(MembersEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(BooksEntity),
          useClass: Repository,
        },
        ...memberProviders,
        ...booksProviders,
        ...borrowingProviders
      ],
    }).compile();

    controller = module.get<BorrowingController>(BorrowingController);
    service = module.get<BorrowingService>(BorrowingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it.skip('should create borrowing successfully', async () => {
      const userId = 'user001';
      const dto: CreateBorrowingDto = { code: 'Code1' };
      const expectedResult = { status: 200, message: 'Success', data: { id: 'borrowingId' } };
      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      const result = await controller.create(userId, dto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(userId, dto);
    });
  });
});
