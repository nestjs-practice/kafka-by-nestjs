import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Nullable } from '@lib/type';

@Entity({
  name: 'user_setting',
  schema: 'mysqlDB',
})
export class UserSettingEntity {
  @PrimaryColumn({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    comment: 'user pk',
  })
  userId: number;

  @Column({
    name: 'agree_email',
    type: 'tinyint',
    default: true,
    comment: '이메일 수신동의',
  })
  agreeEmail: boolean;

  @Column({
    name: 'agree_email_date',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '이메일 수신동의 날짜',
  })
  agreeEmailDate: Nullable<Date>;

  @Column({
    name: 'agree_sms',
    type: 'tinyint',
    default: true,
    comment: '문자 수신동의',
  })
  agreeSms: boolean;

  @Column({
    name: 'agree_sms_date',
    type: 'datetime',
    nullable: true,
    default: null,
    comment: '문자 수신동의 날짜',
  })
  agreeSmsDate: Nullable<Date>;

  constructor(init: UserSettingEntity) {
    Object.assign(this, init);
  }
}
