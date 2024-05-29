import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared';

@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly userClient: ClientKafka,
  ) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    this.userClient.emit('create_user', JSON.stringify(dto));
  }
}
