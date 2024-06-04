import { Module, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mysqlConfig from '@lib/config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@lib/config';
import { BoardEntity } from '@app/board/infrastructure/entity/board.entity';
import { BoardArticleEntity } from '@app/board/infrastructure/entity/board-article.entity';

const controllers: Type[] = [];

const applications: Provider[] = [];

const interfaces: Provider[] = [];

const repositories: Provider[] = [];

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
  ],
  controllers: [...controllers],
  providers: [...applications, ...repositories, ...events, ...interfaces],
  exports: [...interfaces],
})
export class AppModule {}
