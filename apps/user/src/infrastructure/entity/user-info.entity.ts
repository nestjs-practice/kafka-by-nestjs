import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Nullable } from '@lib/type';

@Entity({
  name: 'user_info',
  schema: 'mysqlDB',
})
export class UserInfoEntity {
  @PrimaryColumn({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    comment: 'user pk',
  })
  userId: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    comment: '이름',
  })
  name: string;

  @Column({
    name: 'birth',
    type: 'date',
    nullable: true,
    default: null,
    comment: '생년월일',
  })
  birth?: Nullable<Date>;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 13,
    default: '',
    nullable: false,
    comment: '휴대번호',
  })
  phone: string;

  @Column({
    name: 'updated_date',
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: '수정일',
  })
  updatedDate?: Date;

  constructor(init: UserInfoEntity) {
    Object.assign(this, init);
  }
}
