import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto, GetUserByEmailDto, GetUserByIdDto } from './dto/user.dto';
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

  async deleteUser({ id }: DeleteUserDto) {
    return this.userRepository.deleteUser({ id });
  }

  async getUserByEmail({ email }: GetUserByEmailDto) {
    return this.userRepository.getUserByEmail({ email });
  }

  async getUserById({ id }: GetUserByIdDto) {
    return this.userRepository.getUserById({ id });
  }
}
