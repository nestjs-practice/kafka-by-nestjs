import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '@lib/middleware';
import { UserModule } from '@app/api-gateway/user/user.module';
import { BoardModule } from '@app/api-gateway/board/board.module';

@Module({
  imports: [UserModule, BoardModule],
  providers: [Logger],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
