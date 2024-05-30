import { BaseObject } from '@lib/type';
import { CreateBoardArticleDto } from '@lib/shared/board/create-board-article.dto';

type Props = {
  id?: number;
  userId: number;
  boardId: number;
  title: string;
  content: string;
  createdDate?: Date;
  updatedDate?: Date;
};

export class BoardArticle extends BaseObject<Props> {
  static create(userId: number, boardId: number, dto: CreateBoardArticleDto) {
    // TODO : title, content에 대한 정규식 예외처리
    return new BoardArticle({
      userId,
      boardId,
      title: dto.title,
      content: dto.content,
    });
  }

  // update(dto: ModifyBoardArticleDto) {
  //   this.setProps({
  //     title: dto.title ? dto.title : this.props.title,
  //     content: dto.content ? dto.content : this.props.content,
  //   });
  // }

  getId() {
    return this.props.id;
  }

  getUserId() {
    return this.props.userId;
  }

  getBoardId() {
    return this.props.boardId;
  }

  getTitle() {
    return this.props.title;
  }

  getContent() {
    return this.props.content;
  }

  getCreatedDate() {
    return this.props.createdDate;
  }

  getUpdatedDate() {
    return this.props.updatedDate;
  }
}
