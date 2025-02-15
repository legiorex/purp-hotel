import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoomModel } from './model/room.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FindRoomDto, CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
import { RoomRepository } from './room.repository';
import { ROOM_EXISTS, ROOM_NOT_FOUND } from 'src/const';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async create(dto: CreateRoomDto): Promise<RoomModel> {
    const room = await this.roomRepository.findByNumber(dto.number);

    if (room) {
      throw new HttpException(ROOM_EXISTS, HttpStatus.CONFLICT);
    }

    return this.roomRepository.create(dto);
  }

  async findByNumber(number: number): Promise<RoomModel | null> {
    const room = await this.roomRepository.findByNumber(number);

    if (!room) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return room;
  }

  async findAll(): Promise<RoomModel[]> {
    return this.roomRepository.findAll();
  }

  async update(dto: UpdateRoomDto): Promise<RoomModel | null> {
    let room: RoomModel | null = null;

    if (dto.number) {
      room = await this.roomRepository.findByNumber(dto.number);
    }

    if (room && !new Types.ObjectId(room.id as string).equals(dto.id)) {
      throw new HttpException(ROOM_EXISTS, HttpStatus.CONFLICT);
    }

    const upDateRoom = this.roomRepository.update(dto);

    if (!upDateRoom) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return upDateRoom;
  }

  async delete(id: string): Promise<RoomModel | null> {
    const deletedRoom = this.roomRepository.delete(id);
    if (!deletedRoom) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedRoom;
  }

  async findById(id: string): Promise<RoomModel | null> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return room;
  }

  async find(dto: FindRoomDto): Promise<RoomModel[]> {
    return this.roomRepository.find(dto);
  }
}
