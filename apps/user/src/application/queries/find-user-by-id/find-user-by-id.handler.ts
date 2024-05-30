import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/infrastructure/repository/user/i.user.repository';
import { FindUserByIdRo } from '@app/user/application/queries/find-user-by-id/find-user-by-id.ro';

@Injectable()
export class FindUserByIdHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return FindUserByIdRo.from(user);
  }
}
