import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '@app/board/infrastructure/entity/board.entity';
import { IBoardRepository } from '@app/board/infrastructure/repositories/board/i.board.repository';

@Injectable()
export class BoardRepository implements IBoardRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
  ) {}
}
