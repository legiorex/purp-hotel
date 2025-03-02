import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { USER_ALREADY_EXIST } from 'src/const';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.getUserByEmail({ email: dto.email });

    if (user) {
      throw new HttpException(USER_ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    return this.userRepository.createUser(dto);
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
