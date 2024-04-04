import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { MembersEntity } from 'src/members/entities/member.entity';
import { SignInDTO } from './dto/sign-in.dto';
import { check_password } from 'src/common/util/security';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MEMBERS_REPOSITORY')
    private membersRepo: Repository<MembersEntity>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  async signIn(reqDto: SignInDTO) {
    const { code, password } = reqDto;

    const checkCode = await this.membersRepo.findOneBy({
      code,
    });

    if (!checkCode) {
      throw new BadRequestException('Code not found');
    }

    const checkPassword = await check_password(password, checkCode.password);

    if (!checkPassword) {
      throw new BadRequestException('Password wrong');
    }

    // if (checkEmail.status !== StatusUser.active) {
    //     throw new BadRequestException('User not active');
    // }

    // Success Login

    const now = new Date(Date.now());

    const api_key = process.env.API_KEY;
    const access_token = this.jwtService.sign({
      id: checkCode.id,
    });

    const data = {
      id: checkCode.id,
      code: checkCode.code,
      name: checkCode.name,
      access_token
    };

    return {
      status: 200,
      message: 'signin success',
      data,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
