import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['host.docker.internal:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  });
  await app.listen();
  Logger.log('USER-SERVICE : LISTENING');
}

bootstrap();
