import { BoardArticleEvent } from '@lib/shared/board/events/create-board-article.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/infrastructure/repository/user/i.user.repository';

@EventsHandler(BoardArticleEvent.Created)
export class ArticleCountUpEventHandler implements IEventHandler<BoardArticleEvent.Created> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async handle(event: BoardArticleEvent.Created) {
    Logger.debug('[EVENT] - User Analytics Article Count Up Event Handler');
    const { userId } = event;
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    // * analytics count 업데이트
    user.getAnalytics().setArticleCountUp();
    await this.userRepository.upsert(user);
  }
}
