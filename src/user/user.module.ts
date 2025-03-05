import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './model/user.model';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
})
export class UserModule {}
