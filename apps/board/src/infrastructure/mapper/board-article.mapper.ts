import { BoardArticleEntity } from '@app/board/infrastructure/entity/board-article.entity';
import { BoardArticle } from '@app/board/domain/board-article';

export class BoardArticleMapper {
  static toEntity(model: BoardArticle) {
    return new BoardArticleEntity({
      userId: model.getUserId(),
      boardId: model.getBoardId(),
      title: model.getTitle(),
      content: model.getContent(),
    });
  }

  static toModel(entity: BoardArticleEntity) {
    return new BoardArticle({
      id: entity.id,
      userId: entity.userId,
      boardId: entity.boardId,
      title: entity.title,
      content: entity.content,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });
  }
}
