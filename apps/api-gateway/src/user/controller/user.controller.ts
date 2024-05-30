import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@lib/shared';
import { UserService } from '@api-gateway/user/controller/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    this.userService.createUser(dto);
  }
}
