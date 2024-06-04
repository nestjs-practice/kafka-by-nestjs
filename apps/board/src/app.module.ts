import { Module, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mysqlConfig from '@lib/config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@lib/config';
import { BoardEntity } from '@app/board/infrastructure/entity/board.entity';
import { BoardArticleEntity } from '@app/board/infrastructure/entity/board-article.entity';
import { CreateBoardArticleHandler } from '@app/board/applications/board-article/commands/create-board-article/create-board-article.handler';
import { BoardController } from '@app/board/interfaces/controller/board.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BoardRepositoryToken } from '@app/board/infrastructure/repositories/board/i.board.repository';
import { BoardRepository } from '@app/board/infrastructure/repositories/board/board.repository';
import { BoardArticleRepositoryToken } from '@app/board/infrastructure/repositories/board-article/i.board-article.repository';
import { BoardArticleRepository } from '@app/board/infrastructure/repositories/board-article/board-article.repository';

const controllers: Type[] = [BoardController];

const applications: Provider[] = [CreateBoardArticleHandler];

const interfaces: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: BoardRepositoryToken,
    useClass: BoardRepository,
  },
  {
    provide: BoardArticleRepositoryToken,
    useClass: BoardArticleRepository,
  },
];

const events: Provider[] = [];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [mysqlConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(ormConfig),
    TypeOrmModule.forFeature([BoardEntity, BoardArticleEntity]),
    ClientsModule.register([
      {
        name: 'BOARD_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'board',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'board-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [...controllers],
  providers: [...applications, ...repositories, ...events, ...interfaces],
  exports: [...interfaces],
})
export class AppModule {}
