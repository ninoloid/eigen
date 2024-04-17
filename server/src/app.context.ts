import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configObj from '../config';

let app: NestApplication = null;

export const applicationContext = async () => {
  const config = configObj[process.env.NODE_ENV];

  if (!app) {
    app = (await NestFactory.create(AppModule, {
      cors: true,
    })) as NestApplication;

    app.enableCors({
      origin: config.corsOrigin,
      exposedHeaders: config.corsHeaders,
    });
  }

  return app;
};
