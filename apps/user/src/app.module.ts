import { MiddlewareConsumer, Module, NestModule, Provider, Type } from '@nestjs/common';
import { UserRepositoryToken } from '@app/user/infrastructure/repository/user/i.user.repository';
import { UserRepository } from '@app/user/infrastructure/repository/user/user.repository';
import { UserAccountRepositoryToken } from '@app/user/infrastructure/repository/user-account/i.user-account.repository';
import { UserAccountRepository } from '@app/user/infrastructure/repository/user-account/user-account.repository';
import { ConfigModule } from '@nestjs/config';
import mysqlConfig from '@lib/config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@lib/config';
import { UserAccountEntity } from '@app/user/infrastructure/entity/user-account.entity';
import { UserInfoEntity } from '@app/user/infrastructure/entity/user-info.entity';
import { UserSettingEntity } from '@app/user/infrastructure/entity/user-setting.entity';
import { CreateUserHandler } from '@app/user/application/commands/create-user/create-user.handler';
import { AppController } from '@app/user/interfaces/controller/app.controller';
import { LoggerMiddleware } from '@lib/middleware';

const controllers: Type[] = [AppController];

const applications: Provider[] = [
  /** Command **/
  CreateUserHandler,
];

const interfaces: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: UserRepositoryToken,
    useClass: UserRepository,
  },
  {
    provide: UserAccountRepositoryToken,
    useClass: UserAccountRepository,
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
    TypeOrmModule.forFeature([UserAccountEntity, UserInfoEntity, UserSettingEntity]),
  ],
  controllers: [...controllers],
  providers: [...applications, ...repositories, ...events, ...interfaces],
  exports: [...interfaces],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
