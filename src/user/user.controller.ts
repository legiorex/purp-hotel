import { Controller, Get, Param, Delete, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserByEmailDto, GetUserByIdDto } from './dto/user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enams/role.enam';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('id')
  getUserById(@Query(new ValidationPipe({ transform: true })) query: GetUserByIdDto) {
    return this.userService.getUserById(query);
  }

  @Get('email')
  getUserByEmail(@Query() query: GetUserByEmailDto) {
    return this.userService.getUserByEmail(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
