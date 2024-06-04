import {
  BoardArticleRepositoryToken,
  IBoardArticleRepository,
} from '@app/board/infrastructure/repositories/board-article/i.board-article.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardArticleDto } from '@lib/shared/board/dto/create-board-article.dto';
import { BoardArticle } from '@app/board/domain/board-article';

@Injectable()
export class CreateBoardArticleHandler {
  constructor(
    @Inject(BoardArticleRepositoryToken)
    private readonly boardArticleRepository: IBoardArticleRepository,
  ) {}

  async execute(userId: number, boardId: number, dto: CreateBoardArticleDto) {
    // TODO : user, board에 대한 검증(존재하는지)
    const boardArticle = BoardArticle.create(userId, boardId, dto);
    await this.boardArticleRepository.upsert(boardArticle);
  }
}
