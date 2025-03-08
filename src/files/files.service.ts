import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { FILE_NOT_IMAGE } from 'src/const';

@Injectable()
export class FilesService {
  async uploadImageFile(file: Express.Multer.File): Promise<FileDto[]> {
    if (!file.mimetype.includes('image')) {
      throw new HttpException(FILE_NOT_IMAGE, HttpStatus.BAD_REQUEST);
    }

    const bufferWebP = await this.convertToWebP(file.buffer);

    const originalname = `${file.originalname.split('.')[0]}.webp`;

    return this.saveFiles([file, { ...file, originalname, buffer: bufferWebP }]);
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
    return sharp(file).webp().toBuffer();
  }
}
