import { Module, Provider, Type } from '@nestjs/common';
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
import { UserAnalyticsEntity } from '@app/user/infrastructure/entity/user-analytics.entity';
import { CreateUserHandler } from '@app/user/application/commands/create-user/create-user.handler';

const controllers: Type[] = [];

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
    TypeOrmModule.forFeature([
      UserAccountEntity,
      UserInfoEntity,
      UserSettingEntity,
      UserAnalyticsEntity,
    ]),
    // ClientsModule.register([
    //   {
    //     name: 'USER_MICROSERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'user',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'user-consumer',
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [...controllers],
  providers: [...applications, ...repositories, ...events, ...interfaces],
  exports: [...interfaces],
})
export class AppModule {}
