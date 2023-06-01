import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ enableDebugMessages: true, whitelist: true }),
  );

  const doc = await readFile(join(__dirname, '..', 'doc/api.yaml'), 'utf-8');
  SwaggerModule.setup('doc', app, parse(doc));
  await app.listen(PORT);
}
bootstrap();
