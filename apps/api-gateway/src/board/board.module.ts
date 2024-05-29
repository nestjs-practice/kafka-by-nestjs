import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOARD_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'board',
            brokers: ['host.docker.internal:9092'],
          },
          consumer: {
            groupId: 'board-consumer',
          },
        },
      },
    ]),
  ],
})
export class BoardModule {}
