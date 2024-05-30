import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '@lib/type';

@Entity({
  name: 'user_account',
  schema: 'mysqlDB',
})
export class UserAccountEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
    comment: 'pk',
  })
  id?: Optional<number>;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    comment: '이메일',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    comment: '패스워드',
  })
  password: string;

  @Column({
    name: 'created_date',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: '등록일',
  })
  createdDate?: Date;

  @Column({
    name: 'updated_date',
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: '수정일',
  })
  updatedDate?: Date;

  constructor(init: UserAccountEntity) {
    Object.assign(this, init);
  }
}
