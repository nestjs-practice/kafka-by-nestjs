import { Injectable } from '@nestjs/common';
import { BoardArticleEntity } from '@app/board/infrastructure/entity/board-article.entity';
import { IBoardArticleRepository } from '@app/board/infrastructure/repositories/board-article/i.board-article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardArticle } from '@app/board/domain/board-article';
import { BoardArticleMapper } from '@app/board/infrastructure/mapper/board-article.mapper';

@Injectable()
export class BoardArticleRepository implements IBoardArticleRepository {
  constructor(
    @InjectRepository(BoardArticleEntity)
    private readonly repository: Repository<BoardArticleEntity>,
  ) {}

  async upsert(model: BoardArticle) {
    const entity = BoardArticleMapper.toEntity(model);
    await this.repository.save(entity);
  }

  async findOneById(id: number) {
    const entity = await this.repository.findOneBy({ id });
    return entity ? BoardArticleMapper.toModel(entity) : null;
  }
}
