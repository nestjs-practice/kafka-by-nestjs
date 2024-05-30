import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from '@api-gateway/user/controller/user.controller';
import { UserService } from '@api-gateway/user/controller/user.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: false,
      clients: [
        {
          inject: [],
          name: 'USER_MICROSERVICE',
          useFactory: async () => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'user',
                brokers: ['localhost:9092'],
              },
              producerOnlyMode: true,
              consumer: {
                groupId: 'user-consumer',
              },
            },
          }),
        },
      ],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
