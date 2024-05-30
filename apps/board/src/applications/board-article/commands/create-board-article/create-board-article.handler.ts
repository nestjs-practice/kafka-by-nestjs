import {
  BoardArticleRepositoryToken,
  IBoardArticleRepository,
} from '@app/board/infrastructure/repositories/board-article/i.board-article.repository';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CreateBoardArticleDto } from '@lib/shared/board/create-board-article.dto';
import { BoardArticle } from '@app/board/domain/board-article';
import { BoardArticleEvent } from '@app/board/applications/board-article/commands/create-board-article/events/create-board-article.event';

@Injectable()
export class CreateBoardArticleHandler {
  constructor(
    @Inject(BoardArticleRepositoryToken)
    private readonly boardArticleRepository: IBoardArticleRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: number, boardId: number, dto: CreateBoardArticleDto) {
    // TODO : user, board에 대한 검증(존재하는지)
    const boardArticle = BoardArticle.create(userId, boardId, dto);
    await this.boardArticleRepository.upsert(boardArticle);
    // ! 서브 로직이므로 event객체를 발행해서 업데이트
    this.eventBus.publish(new BoardArticleEvent.Created(userId));
  }
}