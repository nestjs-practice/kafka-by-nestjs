import { BoardArticle } from '@app/board/domain/board-article';
import { Nullable } from '@lib/type';

export const BoardArticleRepositoryToken = Symbol('BoardArticleRepository');

export interface IBoardArticleRepository {
  upsert(model: BoardArticle): Promise<void>;

  findOneById(id: number): Promise<Nullable<BoardArticle>>;
}
