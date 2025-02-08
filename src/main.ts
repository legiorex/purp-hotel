import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Автоматически преобразовывает входные данные в указанный тип
      whitelist: true, // Удаляет неизвестные свойства из тела запроса
      forbidNonWhitelisted: true, // Выбрасывает ошибку, если в теле запроса есть лишние свойства
      stopAtFirstError: true, // Останавливает валидацию при первой найденной ошибке
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
