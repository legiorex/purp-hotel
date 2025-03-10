import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { FILE_NOT_IMAGE, ROOM_NOT_FOUND } from 'src/const';
import { RoomRepository } from 'src/room/room.repository';

@Injectable()
export class FilesService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async uploadImageFile(file: Express.Multer.File, roomId: string): Promise<FileDto[]> {
    const room = await this.roomRepository.findById(roomId);

    if (!room) {
      throw new HttpException(ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (!file.mimetype.includes('image')) {
      throw new HttpException(FILE_NOT_IMAGE, HttpStatus.BAD_REQUEST);
    }

    const bufferWebP = await this.convertToWebP(file.buffer);

    const originalname = `${file.originalname.split('.')[0]}.webp`;

    const saveFiles = await this.saveFiles([file, { ...file, originalname, buffer: bufferWebP }]);

    room.images.push(...saveFiles);
    await room.save();

    return saveFiles;
  }

  async saveFiles(files: Express.Multer.File[]): Promise<FileDto[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const result: FileDto[] = [];

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      result.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname });
    }
    return result;
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).resize({ width: 500, fit: 'cover' }).webp().toBuffer();
  }
}
