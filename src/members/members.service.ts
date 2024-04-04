import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ILike, Repository } from 'typeorm';
import { MembersEntity } from './entities/member.entity';
import { GetListMemberDto } from './dto/get-members.dto';

@Injectable()
export class MembersService {
  constructor(
    @Inject('MEMBERS_REPOSITORY')
    private readonly memberRepo: Repository<MembersEntity>,
  ) {}
  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  async findAll(reqDto: GetListMemberDto) {
    const page = +reqDto.page || 1;
    const take = +reqDto.per_page || 10;
    const skip = (page - 1) * take;

    const queryOptions: any = {
      // where:{
      //   stock: MoreThan(0)
      // },
      relations:{
        borrowings:true
      },
      select: {
        id: true,
        code: true,
        name: true,
        borrowings:{
          id:true
        }
      },
      order: {
        code: 'ASC',
      },
    };

    if (reqDto.name) {
      queryOptions.where = {
        name: ILike(`%${reqDto.name}%`),
      };
    }

    if (reqDto.code) {
      queryOptions.where = {
        code: reqDto.code,
      };
    }

    const [data, total] = await this.memberRepo.findAndCount({
      ...queryOptions,
      take,
      skip,
    });

    const result = data.map((item)=>({
      id: item.id,
      code: item.code,
      name: item.name,
      total_borrowed_books: item.borrowings.length
    }))

    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: {
        list: result,
        metadata: {
          page,
          per_page: take,
          total,
        },
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
