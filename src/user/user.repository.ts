import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './model/user.model';
import { Model } from 'mongoose';
import { CreateUserDto, DeleteUserDto, GetUserByEmailDto, GetUserByIdDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async createUser(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }
  async getUserByEmail({ email }: GetUserByEmailDto) {
    return this.userModel.findOne({ email }).exec();
  }
  async getUserById({ id }: GetUserByIdDto) {
    return this.userModel.findById(id).exec();
  }
  async deleteUser({ id }: DeleteUserDto) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
