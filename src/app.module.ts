import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongooseConfig } from './config/mongoose.config';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    RoomModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseConfig,
    }),
    BookingModule,
    AuthModule,
    UserModule,
    StatisticModule,
  ],
})
export class AppModule {}
