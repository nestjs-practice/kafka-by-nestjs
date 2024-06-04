import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ArticleCountUpHandler } from '@app/analytics/application/user-analytics/commands/article-count-up.handler';
import { ArticleCountDownHandler } from '@app/analytics/application/user-analytics/commands/article-count-down.handler';

@Controller()
export class UserAnalyticsController {
  constructor(
    private readonly articleCountUpHandler: ArticleCountUpHandler,
    private readonly articleCountDownHandler: ArticleCountDownHandler,
  ) {}

  @EventPattern('create-article')
  async countUp(@Payload() payload: any) {
    const { userId } = payload;
    await this.articleCountUpHandler.execute(userId);
    console.log(payload);
  }

  @EventPattern('article-count-down')
  async countDown(@Payload() payload: any) {
    console.log(payload);
  }
}
