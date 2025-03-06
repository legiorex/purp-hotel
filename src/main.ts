import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Автоматически преобразовывает входные данные в указанный тип
      whitelist: true, // Удаляет неизвестные свойства из тела запроса
      forbidNonWhitelisted: true, // Выбрасывает ошибку, если в теле запроса есть лишние свойства
      stopAtFirstError: true, // Останавливает валидацию при первой найденной ошибке
    }),
  );

  app.enableCors();

  const port = configService.get('PORT') || 3000;
  console.log(`Application starting on port ${port}`);
  console.log(`MongoDB host: ${configService.get('MONGO_HOST')}`);

  await app.listen(port);
}
void bootstrap();
