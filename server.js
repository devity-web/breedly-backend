import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import express from 'express';
import {AppModule} from './dist/app.module';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.AUTH_TRUSTED_ORIGIN ?? 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  });

  await app.init();

  return server;
}

export default async function handler(req, res) {
  try {
    const serverInstance = await bootstrap();
    serverInstance(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}
