import { BaseObject } from '@lib/type';
import { CreateUserDto } from '@lib/shared';
import { UserInfo } from '@app/user/domain/user-info';
import { UserSetting } from '@app/user/domain/user-setting';
import { UserAnalytics } from '@app/user/domain/user-analytics';
import { UserAccount } from '@app/user/domain/user-account';

type Props = {
  account: UserAccount;
  info: UserInfo;
  setting: UserSetting;
  analytics: UserAnalytics;
};

// * user aggregation
export class User extends BaseObject<Props> {
  static create(userId: number, dto: CreateUserDto) {
    return new User({
      account: UserAccount.create(userId, dto),
      info: UserInfo.create(userId, dto),
      setting: UserSetting.create(userId, dto),
      analytics: UserAnalytics.empty(userId),
    });
  }

  getAccount() {
    return this.props.account;
  }

  getInfo() {
    return this.props.info;
  }

  getSetting() {
    return this.props.setting;
  }

  getAnalytics() {
    return this.props.analytics;
  }
}
