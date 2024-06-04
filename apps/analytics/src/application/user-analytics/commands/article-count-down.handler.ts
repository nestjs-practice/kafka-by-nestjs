import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ArticleCountDownHandler {
  constructor() {}

  async execute(userId: number) {
    Logger.debug('[EVENT] - User Analytics Article Count Down Event Handler');
    // const user = await this.userRepository.findUserById(userId);
    // if (!user) {
    //   throw new NotFoundException();
    // }
    // // * analytics count 업데이트
    // user.getAnalytics().setArticleCountDown();
    // await this.userRepository.upsert(user);
  }
}
