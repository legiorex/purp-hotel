import { Injectable } from '@nestjs/common';
import { RoomModel } from './model/room.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from './dto/room.dto';
import { FindRoomDto } from './dto/find-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(RoomModel.name) private readonly roomModel: Model<RoomModel>) {}

  async create(dto: RoomDto): Promise<RoomModel> {
    return this.roomModel.create(dto);
  }

  async findByNumber(number: number): Promise<RoomModel | null> {
    return this.roomModel.findOne({ number }).exec();
  }

  async findAll(): Promise<RoomModel[]> {
    return this.roomModel.find().exec();
  }

  async update(id: string, dto: RoomDto): Promise<RoomModel | null> {
    return this.roomModel.findByIdAndUpdate(id, dto, { new: true }).exec();
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
