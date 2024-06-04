import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@app/user/infrastructure/repository/user/i.user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccountEntity } from '@app/user/infrastructure/entity/user-account.entity';
import { Repository } from 'typeorm';
import { UserInfoEntity } from '@app/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@app/user/infrastructure/entity/user-setting.entity';
import { UserAccount } from '@app/user/domain/user-account';
import { UserAccountMapper } from '@app/user/infrastructure/mapper/user-account.mapper';
import { User } from '@app/user/domain/user';
import { UserInfoMapper } from '@app/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@app/user/infrastructure/mapper/user-setting.mapper';
import { Nullable } from '@lib/type';
import { UserMapper } from '@app/user/infrastructure/mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userAccountRepository: Repository<UserAccountEntity>,
    @InjectRepository(UserInfoEntity)
    private readonly userInfoRepository: Repository<UserInfoEntity>,
    @InjectRepository(UserSettingEntity)
    private readonly userSettingRepository: Repository<UserSettingEntity>,
  ) {}

  async insertUserId(model: UserAccount): Promise<number> {
    const entity = UserAccountMapper.toEntity(model);
    const savedEntity = await this.userAccountRepository.save(entity);
    return savedEntity.id!;
  }

  async upsert(model: User): Promise<void> {
    const userAccountEntity = UserAccountMapper.toEntity(model.getAccount());
    const userInfoEntity = UserInfoMapper.toEntity(model.getInfo());
    const userSettingEntity = UserSettingMapper.toEntity(model.getSetting());
    await Promise.all([
      this.userAccountRepository.save(userAccountEntity),
      this.userInfoRepository.save(userInfoEntity),
      this.userSettingRepository.save(userSettingEntity),
    ]);
  }

  async findUserById(userId: number): Promise<Nullable<User>> {
    const [account, info, setting] = await Promise.all([
      this.userAccountRepository.findOneBy({ id: userId }),
      this.userInfoRepository.findOneBy({ userId }),
      this.userSettingRepository.findOneBy({ userId }),
    ]);
    if (!account || !info || !setting) {
      return null;
    }
    return UserMapper.toModel(account, info, setting);
  }
}
