import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import SessionMiddleware from './support/middlewares/sessions.middleware';
import { LogService } from './modules/core/entities/logger/logger.service';

/**
 * Function to start main class of NestJS
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.use(SessionMiddleware);
  app.useLogger(app.get(LogService));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}

/*
|--------------------------------------------------------------------------
| Create boostrap app.
|--------------------------------------------------------------------------
|
| Initialize main function to start app.
|
*/
bootstrap();
