import { UserAccount } from '@app/user/domain/user-account';
import { User } from '@app/user/domain/user';
import { Nullable } from '@lib/type';

export const UserRepositoryToken = Symbol('UserRepository');

export interface IUserRepository {
  insertUserId(model: UserAccount): Promise<number>;

  upsert(model: User): Promise<void>;

  findUserById(userId: number): Promise<Nullable<User>>;
}
