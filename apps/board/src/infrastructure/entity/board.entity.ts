import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '@lib/type';

@Entity({
  name: 'board',
  schema: 'mysqlDB',
})
export class BoardEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
    comment: 'pk',
  })
  id?: Optional<number>;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    comment: '게시판 명',
  })
  name: string;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    width: 1,
    comment: '숨김 여부',
  })
  isHidden: boolean;

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

  constructor(init: BoardEntity) {
    Object.assign(this, init);
  }
}
