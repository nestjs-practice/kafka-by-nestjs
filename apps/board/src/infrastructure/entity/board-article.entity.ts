import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '@lib/type';

@Entity({
  name: 'board_article',
  schema: 'mysqlDB',
})
export class BoardArticleEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
    comment: 'pk',
  })
  id?: Optional<number>;

  @Column({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    comment: 'user pk',
  })
  userId: number;

  @Column({
    name: 'board_id',
    type: 'int',
    unsigned: true,
    comment: 'board pk',
  })
  boardId: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 200,
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    comment: '게시글 내용',
  })
  content: string;

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

  constructor(init: BoardArticleEntity) {
    Object.assign(this, init);
  }
}
