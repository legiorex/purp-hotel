import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from 'src/common/enams/role.enam';

export class UserDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEnum(Role)
  role: Role;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class DeleteUserDto extends PickType(UserDto, ['id']) {}
export class GetUserByIdDto extends PickType(UserDto, ['id']) {}
export class GetUserByEmailDto extends PickType(UserDto, ['email']) {}
