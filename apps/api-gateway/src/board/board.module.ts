import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: false,
      clients: [
        {
          inject: [],
          name: 'BOARD_MICROSERVICE',
          useFactory: async () => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'board',
                brokers: ['localhost:9092'],
              },
              producerOnlyMode: true,
              consumer: {
                groupId: 'board-consumer',
              },
            },
          }),
        },
      ],
    }),
  ],
})
export class BoardModule {}
