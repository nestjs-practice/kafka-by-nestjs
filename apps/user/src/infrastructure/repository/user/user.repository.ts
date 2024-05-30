import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@app/user/infrastructure/repository/user/i.user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccountEntity } from '@app/user/infrastructure/entity/user-account.entity';
import { Repository } from 'typeorm';
import { UserInfoEntity } from '@app/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@app/user/infrastructure/entity/user-setting.entity';
import { UserAnalyticsEntity } from '@app/user/infrastructure/entity/user-analytics.entity';
import { UserAccount } from '@app/user/domain/user-account';
import { UserAccountMapper } from '@app/user/infrastructure/mapper/user-account.mapper';
import { User } from '@app/user/domain/user';
import { UserInfoMapper } from '@app/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@app/user/infrastructure/mapper/user-setting.mapper';
import { UserAnalyticsMapper } from '@app/user/infrastructure/mapper/user-analytics.mapper';
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
    @InjectRepository(UserAnalyticsEntity)
    private readonly userAnalyticsRepository: Repository<UserAnalyticsEntity>,
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
    const userAnalyticsEntity = UserAnalyticsMapper.toEntity(model.getAnalytics());
    await Promise.all([
      this.userAccountRepository.save(userAccountEntity),
      this.userInfoRepository.save(userInfoEntity),
      this.userSettingRepository.save(userSettingEntity),
      this.userAnalyticsRepository.save(userAnalyticsEntity),
    ]);
  }

  async findUserById(userId: number): Promise<Nullable<User>> {
    const [account, info, setting, analytics] = await Promise.all([
      this.userAccountRepository.findOneBy({ id: userId }),
      this.userInfoRepository.findOneBy({ userId }),
      this.userSettingRepository.findOneBy({ userId }),
      this.userAnalyticsRepository.findOneBy({ userId }),
    ]);
    if (!account || !info || !setting || !analytics) {
      return null;
    }
    return UserMapper.toModel(account, info, setting, analytics);
  }
}
