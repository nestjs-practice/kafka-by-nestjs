import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BoardController } from '@app/api-gateway/board/controller/board.controller';

@Module({
  providers: [
    {
      provide: 'BOARD_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3002,
          },
        });
      },
    },
  ],
  controllers: [BoardController],
})
export class BoardModule {}
