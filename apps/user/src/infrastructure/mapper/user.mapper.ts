import { UserAccountEntity } from '@app/user/infrastructure/entity/user-account.entity';
import { UserInfoEntity } from '@app/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@app/user/infrastructure/entity/user-setting.entity';
import { UserAnalyticsEntity } from '@app/user/infrastructure/entity/user-analytics.entity';
import { User } from '@app/user/domain/user';
import { UserAccountMapper } from '@app/user/infrastructure/mapper/user-account.mapper';
import { UserInfoMapper } from '@app/user/infrastructure/mapper/user-info.mapper';
import { UserSettingMapper } from '@app/user/infrastructure/mapper/user-setting.mapper';
import { UserAnalyticsMapper } from '@app/user/infrastructure/mapper/user-analytics.mapper';

export class UserMapper {
  static toModel(
    account: UserAccountEntity,
    info: UserInfoEntity,
    setting: UserSettingEntity,
    analytics: UserAnalyticsEntity,
  ) {
    return new User({
      account: UserAccountMapper.toModel(account),
      info: UserInfoMapper.toModel(info),
      setting: UserSettingMapper.toModel(setting),
      analytics: UserAnalyticsMapper.toModel(analytics),
    });
  }
}
