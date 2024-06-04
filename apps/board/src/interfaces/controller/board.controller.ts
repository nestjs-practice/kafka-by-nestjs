import { Controller } from '@nestjs/common';
import { CreateBoardArticleHandler } from '@app/board/applications/board-article/commands/create-board-article/create-board-article.handler';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class BoardController {
  constructor(private readonly createBoardArticleHandler: CreateBoardArticleHandler) {}

  @MessagePattern('create-board-article')
  async createBoardArticle(@Payload() payload: any) {
    const { boardId, dto } = payload;
    await this.createBoardArticleHandler.execute(boardId, dto);
    return true;
    // await this.createBoardArticleHandler.execute(boardId, dto);
  }
}
