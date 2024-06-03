import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    {
      provide: 'BOARD_MICROSERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'board-service',
            port: 3002,
          },
        });
      },
    },
  ],
  controllers: [],
})
export class BoardModule {}
