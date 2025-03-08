import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { RoomRepository } from 'src/room/room.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomSchema } from 'src/room/model/room.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
    }),
    MongooseModule.forFeature([{ name: RoomModel.name, schema: RoomSchema }]),
  ],
  controllers: [FilesController],
  providers: [FilesService, RoomRepository],
})
export class FilesModule {}
