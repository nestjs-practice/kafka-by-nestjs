import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from '@app/board/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'board',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'board-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
  Logger.log('BOARD-SERVICE : LISTENING ON TCP 3002PORT');
}

bootstrap();
