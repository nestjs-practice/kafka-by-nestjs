import { Module, Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mysqlConfig from '@lib/config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@lib/config';
import { UserAnalyticsEntity } from '@app/analytics/infrastructure/entity/user-analytics.entity';
import { ArticleCountUpHandler } from '@app/analytics/application/user-analytics/commands/article-count-up.handler';
import { ArticleCountDownHandler } from '@app/analytics/application/user-analytics/commands/article-count-down.handler';
import { UserAnalyticsController } from '@app/analytics/interfaces/controller/user-analytics.controller';

const controllers: Type[] = [UserAnalyticsController];

const applications: Provider[] = [
  /** User-Analytics **/
  ArticleCountUpHandler,
  ArticleCountDownHandler,
];

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
    TypeOrmModule.forFeature([UserAnalyticsEntity]),
  ],
  controllers: [...controllers],
  providers: [...applications, ...repositories, ...events, ...interfaces],
  exports: [...interfaces],
})
export class AnalyticsModule {}
