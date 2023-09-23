import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const config = new DocumentBuilder()
.setTitle('Backend Project NestJS')
.setDescription('API description v1')
.setVersion('1.0')
.addTag('NestJS')
.addBearerAuth({ in: 'header', type: 'http' })
.build();

const port = process.env.PORT || 3000;


const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  // await app.listen(3000);
  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}

bootstrap();
