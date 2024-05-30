import { Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/infrastructure/repository/user/i.user.repository';
import { EventPattern, Payload, Transport } from '@nestjs/microservices';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  @Transactional()
  @EventPattern('create-user', Transport.KAFKA)
  async execute(@Payload() payload: string) {
    console.log(JSON.parse(payload));
    // const userAccount = UserAccount.empty();
    // const userId = await this.userRepository.insertUserId(userAccount);
    // // * user 객체 생성
    // const user = User.create(userId, dto);
    // await this.userRepository.upsert(user);
  }
}
