import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const mongooseConfig = (configService: ConfigService): MongooseModuleFactoryOptions => {
  const prefix = 'mongodb';
  const login = configService.get<string>('MONGO_LOGIN');
  const password = configService.get<string>('MONGO_PASSWORD');
  const host = configService.get<string>('MONGO_HOST');
  const port = configService.get<string>('MONGO_PORT');
  const dbName = configService.get<string>('MONGO_DATABASE');
  const uri = `${prefix}://${login}:${password}@${host}:${port}/${dbName}?authSource=admin`;

  return { uri };
};
