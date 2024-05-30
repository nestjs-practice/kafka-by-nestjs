import { Injectable } from '@nestjs/common';
import { IUserAccountRepository } from '@app/user/infrastructure/repository/user-account/i.user-account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccountEntity } from '@app/user/infrastructure/entity/user-account.entity';
import { Repository } from 'typeorm';
import { UserAccountMapper } from '@app/user/infrastructure/mapper/user-account.mapper';

@Injectable()
export class UserAccountRepository implements IUserAccountRepository {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly repository: Repository<UserAccountEntity>,
  ) {}

  async findOneByEmail(email: string) {
    const entity = await this.repository.findOneBy({ email });
    return entity ? UserAccountMapper.toModel(entity) : null;
  }
}
