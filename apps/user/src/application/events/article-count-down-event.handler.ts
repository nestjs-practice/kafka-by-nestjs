import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/infrastructure/repository/user/i.user.repository';
import { BoardArticleEvent } from '@lib/shared/board/events/create-board-article.event';

@EventsHandler(BoardArticleEvent.Deleted)
export class ArticleCountDownEventHandler implements IEventHandler<BoardArticleEvent.Deleted> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async handle(event: BoardArticleEvent.Deleted) {
    Logger.debug('[EVENT] - User Analytics Article Count Down Event Handler');
    const { userId } = event;
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    // * analytics count 업데이트
    user.getAnalytics().setArticleCountDown();
    await this.userRepository.upsert(user);
  }
}
