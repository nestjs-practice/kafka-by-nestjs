import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from '@app/api-gateway/user/controller/user.controller';
import { UserService } from '@app/api-gateway/user/service/user.service';

@Module({
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3001,
          },
        });
      },
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
