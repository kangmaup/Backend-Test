import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const logger = new Logger('bootstrap');

  const configService = app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  
  const APP_PORT: number = configService.get('APP_PORT')
    ? +configService.get<number>('APP_PORT')
    : 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(APP_PORT, () => {
    logger.log(`Application running on port ${APP_PORT}`);
});
}
bootstrap();
