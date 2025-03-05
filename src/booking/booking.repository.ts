import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingModel } from './model/booking.model';
import { Model, Types, FilterQuery } from 'mongoose';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { RoomModel } from 'src/room/model/room.model';
import { UserModel } from 'src/user/model/user.model';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(BookingModel.name) private readonly bookingModel: Model<BookingModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(RoomModel.name) private readonly roomModel: Model<RoomModel>,
  ) {}

  async findIdByFilter(filter: FilterQuery<BookingModel>): Promise<{ _id: Types.ObjectId } | null> {
    const result = await this.bookingModel.exists(filter);

    return result as { _id: Types.ObjectId } | null;
  }

  async create(room: RoomModel, user: UserModel, dto: CreateBookingDto): Promise<BookingModel | null> {
    return this.bookingModel.create({ ...dto, roomId: room._id, userId: user._id });
  }

  async update(id: string, dto: UpdateBookingDto): Promise<BookingModel | null> {
    return await this.bookingModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findById(id: string): Promise<BookingModel | null> {
    return this.bookingModel.findById(id).exec();
  }
  async findAll(): Promise<BookingModel[]> {
    return this.bookingModel
      .aggregate()
      .lookup({
        from: this.userModel.collection.name,
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      })
      .lookup({
        from: this.roomModel.collection.name,
        localField: 'roomId',
        foreignField: '_id',
        as: 'room',
      })
      .addFields({
        user: { $arrayElemAt: ['$user', 0] },
        room: { $arrayElemAt: ['$room', 0] },
      })
      .project({
        'user.passwordHash': 0,
        'user.createdAt': 0,
        'user.updatedAt': 0,
        'user.__v': 0,
        'room.__v': 0,
        'room.createdAt': 0,
        'room.updatedAt': 0,
      })
      .exec();
  }
  async findByRoom(roomId: string): Promise<BookingModel[]> {
    return this.bookingModel.find({ roomId: new Types.ObjectId(roomId) }).exec();
  }
  async findByRange(dto: { checkIn: Date; checkOut: Date }): Promise<BookingModel[]> {
    return this.bookingModel.find({ checkIn: { $gte: dto.checkIn }, checkOut: { $lte: dto.checkOut } }).exec();
  }
}
