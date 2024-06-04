import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ArticleCountUpHandler {
  constructor() {}

  async execute(userId: number) {
    Logger.debug('[EVENT] - User Analytics Article Count Up Event Handler');
  }
}
