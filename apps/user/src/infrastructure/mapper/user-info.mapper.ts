import { UserInfo } from '@app/user/domain/user-info';
import { UserInfoEntity } from '@app/user/infrastructure/entity/user-info.entity';

export class UserInfoMapper {
  static toEntity(model: UserInfo) {
    return new UserInfoEntity({
      userId: model.getUserId(),
      name: model.getName(),
      birth: model.getBirth(),
      phone: model.getPhone(),
    });
  }

  static toModel(entity: UserInfoEntity) {
    return new UserInfo({
      userId: entity.userId,
      name: entity.name,
      birth: entity.birth,
      phone: entity.phone,
    });
  }
}
