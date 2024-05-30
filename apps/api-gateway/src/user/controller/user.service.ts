import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@lib/shared';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly clientKafka: ClientKafka,
  ) {}

  onModuleInit() {
    this.clientKafka.connect();
  }

  createUser(dto: CreateUserDto) {
    this.clientKafka.emit('create-user', JSON.stringify(dto));
  }
}
