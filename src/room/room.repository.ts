import { Injectable } from '@nestjs/common';
import { RoomModel } from './model/room.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindRoomDto, CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomRepository {
  constructor(@InjectModel(RoomModel.name) private readonly roomModel: Model<RoomModel>) {}

  async create(dto: CreateRoomDto): Promise<RoomModel> {
    return this.roomModel.create(dto);
  }

  async findByNumber(number: number): Promise<RoomModel | null> {
    return this.roomModel.findOne({ number }).exec();
  }

  async findAll(): Promise<RoomModel[]> {
    return this.roomModel.find().exec();
  }

  async update(dto: UpdateRoomDto): Promise<RoomModel | null> {
    return this.roomModel.findByIdAndUpdate(dto.id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<RoomModel | null> {
    return this.roomModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<RoomModel | null> {
    return this.roomModel.findById(id).exec();
  }

  async find(dto: FindRoomDto): Promise<RoomModel[]> {
    return this.roomModel
      .find({
        $or: [{ capacity: dto.capacity }, { price: dto.price }],
      })
      .exec();
  }
}
