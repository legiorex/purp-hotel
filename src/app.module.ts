import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongooseConfig } from './config/mongoose.config';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StatisticModule } from './statistic/statistic.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseConfig,
    }),
    RoomModule,
    BookingModule,
    AuthModule,
    UserModule,
    StatisticModule,
    FilesModule,
  ],
})
export class AppModule {}
