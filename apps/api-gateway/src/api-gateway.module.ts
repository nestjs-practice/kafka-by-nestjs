import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UserModule, BoardModule],
})
export class ApiGatewayModule {}
