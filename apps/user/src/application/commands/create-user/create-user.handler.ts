import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/infrastructure/repository/user/i.user.repository';
import { UserAccount } from '@app/user/domain/user-account';
import { User } from '@app/user/domain/user';
import { CreateUserDto } from '@lib/shared';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto) {
    const userAccount = UserAccount.empty();
    const userId = await this.userRepository.insertUserId(userAccount);
    // * user 객체 생성
    const user = User.create(userId, dto);
    await this.userRepository.upsert(user);
    // TODO : export용 user ro 필요
    return user.props;
  }
}
