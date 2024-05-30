import { Nullable } from '@lib/type';
import { UserInfo } from '@app/user/domain/user-info';
import { UserSetting } from '@app/user/domain/user-setting';
import { User } from '@app/user/domain/user';

class UserInfoRo {
  readonly name: string;
  readonly birth: Nullable<Date>;
  readonly phone: string;

  static from(model: UserInfo) {
    return {
      name: model.getName(),
      birth: model.getBirth(),
      phone: model.getPhone(),
    };
  }
}

class UserSettingRo {
  readonly agreeEmail: boolean;
  readonly agreeSms: boolean;

  static from(model: UserSetting) {
    return {
      agreeEmail: model.getAgreeEmail(),
      agreeSms: model.getAgreeSms(),
    };
  }
}

export class FindUserByIdRo {
  readonly id: number;
  readonly email: string;
  readonly info: UserInfoRo;
  readonly setting: UserSettingRo;

  static from(model: User) {
    return {
      id: model.getAccount().getId(),
      email: model.getAccount().getEmail(),
      info: UserInfoRo.from(model.getInfo()),
      setting: UserSettingRo.from(model.getSetting()),
    };
  }
}
