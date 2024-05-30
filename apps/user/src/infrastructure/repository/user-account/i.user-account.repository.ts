import { Nullable } from '@lib/type';
import { UserAccount } from '@app/user/domain/user-account';

export const UserAccountRepositoryToken = Symbol('UserAccountRepository');

export interface IUserAccountRepository {
  findOneByEmail(email: string): Promise<Nullable<UserAccount>>;
}
