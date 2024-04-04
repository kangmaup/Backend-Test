import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ILike, MoreThan, Repository } from 'typeorm';
import { BooksEntity } from './entities/book.entity';
import { GetListBookDto } from './dto/get-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private readonly bookRepo: Repository<BooksEntity>,
  ) {}
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll(reqDto: GetListBookDto) {
    const page = +reqDto.page || 1;
    const take = +reqDto.per_page || 10;
    const skip = (page - 1) * take;

    const queryOptions: any = {
      where:{
        stock: MoreThan(0)
      },
      select: {
        id: true,
        code: true,
        title: true,
        stock: true,
      },
      order: {
        code: 'ASC',
      },
    };

    if (reqDto.title) {
      queryOptions.where = {
        title: ILike(`%${reqDto.title}%`),
      };
    }

    const [data, total] = await this.bookRepo.findAndCount({
      ...queryOptions,
      take,
      skip,
    });

    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: {
        list: data,
        metadata: {
          page,
          per_page: take,
          total,
        },
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
