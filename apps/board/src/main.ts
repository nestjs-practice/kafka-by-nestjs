import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { BoardModule } from '@app/board/board.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BoardModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['host.docker.internal:9092'],
      },
      consumer: {
        groupId: 'board-consumer',
      },
    },
  });
  await app.listen();
  Logger.log('BOARD-SERVICE : LISTENING');
}

bootstrap();
