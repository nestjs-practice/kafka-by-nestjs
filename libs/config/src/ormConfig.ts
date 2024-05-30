import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const ormConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    let obj: TypeOrmModuleOptions = {
      type: 'mysql',
      host: configService.get('mysql.host'),
      port: configService.get('mysql.port'),
      database: configService.get('mysql.database'),
      username: configService.get('mysql.username'),
      password: configService.get('mysql.password'),
      autoLoadEntities: true,
    };
    // 주의! development 환경에서만 개발 편의성을 위해 활용
    if (configService.get('NODE_ENV') === 'development') {
      console.info('Sync TypeORM');
      obj = Object.assign(obj, {
        synchronize: true,
        logging: false,
      });
    }
    return obj;
  },
};
