import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteUserDto, GetUserByEmailDto, GetUserByIdDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id')
  getUserById(@Query() query: GetUserByIdDto) {
    return this.userService.getUserById(query);
  }

  @Get('email')
  getUserByEmail(@Query() query: GetUserByEmailDto) {
    return this.userService.getUserByEmail(query);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
