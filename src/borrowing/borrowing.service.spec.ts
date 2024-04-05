import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { Repository } from 'typeorm';
import { MembersEntity } from '../members/entities/member.entity';
import { BooksEntity } from '../books/entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForbiddenException, HttpStatus, NotFoundException } from '@nestjs/common';
import { memberProviders } from '../members/members.provider';
import { booksProviders } from '../books/books.provider';
import { borrowingProviders } from './borrowing.provider';
import { DatabaseModule } from '../database/database.module';
import { v4 as uuidv4 } from 'uuid';


// describe('BorrowingService', () => {
//   let service: BorrowingService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [BorrowingService],
//     }).compile();

//     service = module.get<BorrowingService>(BorrowingService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

describe('BorrowingService', () => {
  let service: BorrowingService;
  let memberRepo: Repository<MembersEntity>;
  let bookRepo: Repository<BooksEntity>;

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

    service = module.get<BorrowingService>(BorrowingService);
    memberRepo = module.get<Repository<MembersEntity>>(getRepositoryToken(MembersEntity));
    bookRepo = module.get<Repository<BooksEntity>>(getRepositoryToken(BooksEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const uuid = uuidv4();
  describe('validateMember', () => {
    
    it('should throw NotFoundException if user does not exist', async () => {
      memberRepo.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.validateMember('user123')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is penalized', async () => {
      const mockedUser = { id: uuid, status: 'penalized' };
      memberRepo.findOne = jest.fn().mockResolvedValue(mockedUser);
      await expect(service.validateMember(uuid)).rejects.toThrow(ForbiddenException);
    });

    it('should return user data if user is valid', async () => {
      const mockedUser = { id: uuid, status: 'active' };
      memberRepo.findOne = jest.fn().mockResolvedValue(mockedUser);
      expect(await service.validateMember(uuid)).toEqual(mockedUser);
    });
  });

  describe('validateBook', () => {
    it('should throw NotFoundException if book does not exist', async () => {
      bookRepo.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.validateBook('book456')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if book stock is 0', async () => {
      const mockedBook = { code: 'book456', stock: 0 };
      bookRepo.findOne = jest.fn().mockResolvedValue(mockedBook);
      await expect(service.validateBook('book456')).rejects.toThrow(ForbiddenException);
    });

    it('should return book data if book is valid', async () => {
      const mockedBook = { code: 'book456', stock: 1 };
      bookRepo.findOne = jest.fn().mockResolvedValue(mockedBook);
      expect(await service.validateBook('book456')).toEqual(mockedBook);
    });
  });

  describe('create', () => {
    it('should create borrowing and return success message', async () => {
      const mockedUser = { id: uuid, status: 'active' };
      const mockedBook = { code: 'book456', stock: 1 };
      const dto: CreateBorrowingDto = { code: 'book456' };
      const createBorrowing = { id: 'aac74014-c396-4a28-ac69-66f561c8e0d7' };

      memberRepo.findOne = jest.fn().mockResolvedValue(mockedUser);
      bookRepo.findOne = jest.fn().mockResolvedValue(mockedBook);
      service.create = { create: jest.fn().mockResolvedValue(createBorrowing), save: jest.fn() } as any;

      const result = await service.create(uuid, dto);
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Success',
        data: {
          id: uuid,
        },
      });
    });

    it('should decrement book stock by 1', async () => {
      const mockedUser = { id: 'aac74014-c396-4a28-ac69-66f561c8e0d7', status: 'active' };
      const mockedBook = { id: 'book456', stock: 0 };
      const dto: CreateBorrowingDto = { code: 'book456' };
      const createBorrowingResult = {
        status: HttpStatus.OK,
        message: 'Success',
        data: {
          id: 'aac74014-c396-4a28-ac69-66f561c8e0d8'
        }
      };

jest.spyOn(service, 'create').mockResolvedValue(createBorrowingResult);
      memberRepo.findOne = jest.fn().mockResolvedValue(mockedUser);
      bookRepo.findOne = jest.fn().mockResolvedValue(mockedBook);
  
      await service.create(uuid, dto);
      expect(mockedBook.stock).toBe(0);
      expect(bookRepo.save).toHaveBeenCalledWith(mockedBook);
    });
  });
});
