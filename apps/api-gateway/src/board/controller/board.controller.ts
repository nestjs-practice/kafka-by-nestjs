import { Body, Controller, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateBoardArticleDto } from '@lib/shared/board/dto/create-board-article.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject('BOARD_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Post(':boardId/article')
  createBoardArticle(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() dto: CreateBoardArticleDto,
  ) {
    return this.client.send('create-board-article', { boardId, dto });
  }
}
