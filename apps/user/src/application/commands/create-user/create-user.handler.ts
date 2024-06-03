import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/infrastructure/repository/user/i.user.repository';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  @MessagePattern('create-user')
  async execute(@Payload() data: any) {
    console.log(data);
    // const userAccount = UserAccount.empty();
    // const userId = await this.userRepository.insertUserId(userAccount);
    // // * user 객체 생성
    // const user = User.create(userId, dto);
    // await this.userRepository.upsert(user);
    return { success: true };
  }
}
