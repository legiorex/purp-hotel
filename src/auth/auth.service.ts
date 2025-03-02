import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { USER_ALREADY_EXIST, USER_NOT_FOUND, WRONG_PASSWORD } from 'src/const';
import { UserRepository } from 'src/user/user.repository';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserModel } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, password, ...dto }: RegisterDto) {
    const user = await this.userRepository.getUserByEmail({ email });

    if (user) {
      throw new HttpException(USER_ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const userData = {
      ...dto,
      email,
      passwordHash,
    };
    return await this.userRepository.createUser(userData);
  }
  async login(dto: LoginDto) {
    const payload = await this.validateUser(dto);
    return this.getAccessToken(payload);
  }

  async validateUser({ email, password }: LoginDto): Promise<Pick<UserModel, 'email' | 'role'>> {
    const user = await this.userRepository.getUserByEmail({ email });
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const isPasswordMatch = await compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new HttpException(WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
    }

    return { email: user.email, role: user.role };
  }

  async getAccessToken(payload: Pick<UserModel, 'email' | 'role'>) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
