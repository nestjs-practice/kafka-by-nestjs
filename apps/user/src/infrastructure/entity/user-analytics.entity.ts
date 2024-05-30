import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'user_analytics',
  schema: 'mysqlDB',
})
export class UserAnalyticsEntity {
  @PrimaryColumn({
    name: 'user_id',
    type: 'int',
    unsigned: true,
    comment: 'user pk',
  })
  userId: number;

  @Column({
    name: 'article_count',
    type: 'int',
    unsigned: true,
    comment: '게시글 작성 개수',
  })
  articleCount: number;

  @Column({
    name: 'updated_date',
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: '수정일',
  })
  updatedDate?: Date;

  constructor(init: UserAnalyticsEntity) {
    Object.assign(this, init);
  }
}
