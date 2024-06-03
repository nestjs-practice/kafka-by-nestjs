import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@lib/shared';
import { UserService } from '@app/api-gateway/user/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
