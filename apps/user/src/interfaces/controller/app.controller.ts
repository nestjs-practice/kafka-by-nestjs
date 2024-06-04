import { Controller } from '@nestjs/common';
import { CreateUserDto } from '@lib/shared';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserHandler } from '@app/user/application/commands/create-user/create-user.handler';

@Controller()
export class AppController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  @MessagePattern('create-user')
  createUser(dto: CreateUserDto) {
    return this.createUserHandler.execute(dto);
  }
}
