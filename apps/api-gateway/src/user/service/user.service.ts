import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@lib/shared';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async createUser(@Body() dto: CreateUserDto) {
    console.log(this.client);
    // const pattern = { cmd: 'create-user' };
    return this.client.send<{ success: boolean }>('create-user', dto);
  }
}
