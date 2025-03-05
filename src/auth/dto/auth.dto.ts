import { PickType } from '@nestjs/mapped-types';
import { IsString, IsEmail, MinLength, IsEnum, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/common/enams/role.enam';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEnum(Role)
  role: Role;
}

export class RegisterDto extends AuthDto {}
export class LoginDto extends PickType(AuthDto, ['email', 'password']) {}
