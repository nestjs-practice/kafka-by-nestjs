import { UserSetting } from '@app/user/domain/user-setting';
import { UserSettingEntity } from '@app/user/infrastructure/entity/user-setting.entity';

export class UserSettingMapper {
  static toEntity(model: UserSetting) {
    return new UserSettingEntity({
      userId: model.getUserId(),
      agreeEmail: model.getAgreeEmail(),
      agreeEmailDate: model.getAgreeEmailDate(),
      agreeSms: model.getAgreeSms(),
      agreeSmsDate: model.getAgreeSmsDate(),
    });
  }

  static toModel(entity: UserSettingEntity) {
    return new UserSetting({
      userId: entity.userId,
      agreeEmail: entity.agreeEmail,
      agreeEmailDate: entity.agreeEmailDate,
      agreeSms: entity.agreeSms,
      agreeSmsDate: entity.agreeSmsDate,
    });
  }
}
