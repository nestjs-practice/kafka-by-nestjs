// import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
// import {
//   BoardArticleRepositoryToken,
//   IBoardArticleRepository,
// } from '@/features/board/infrastructure/repositories/board-article/i.board-article.repository';
// import { ModifyBoardArticleDto } from '@/features/board/applications/board-article/commands/modify-board-article/modify-board-article.dto';
//
// @Injectable()
// export class ModifyBoardArticleHandler {
//   constructor(
//     @Inject(BoardArticleRepositoryToken)
//     private readonly boardArticleRepository: IBoardArticleRepository,
//   ) {}
//
//   async execute(userId: number, articleId: number, dto: ModifyBoardArticleDto) {
//     // TODO : user, article에 대한 검증(존재하는지)
//     const boardArticle = await this.boardArticleRepository.findOneById(articleId);
//     if (!boardArticle) {
//       throw new NotFoundException();
//     }
//
//     if (boardArticle.getUserId() !== userId) {
//       throw new ForbiddenException();
//     }
//     boardArticle.update(dto);
//     await this.boardArticleRepository.upsert(boardArticle);
//   }
// }
