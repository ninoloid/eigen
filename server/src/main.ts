import { applicationContext } from './app.context';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pjson from '../package.json';

async function bootstrap() {
  const app = await applicationContext();

  const configService = app.get(ConfigService);

  // Setup Document Swagger for Documentation API
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(pjson.name)
      .setDescription(pjson.description)
      .setVersion(pjson.version)
      .addTag('PopulixTechTeam')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  // Use validator for mutation process
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appPort = configService.get<number>(
    'APP_PORT',
    parseInt(process.env.APP_PORT),
  );

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(appPort);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
