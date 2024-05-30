import { Module } from '@nestjs/common';
import { BoardModule } from '@api-gateway/board/board.module';
import { UserModule } from '@api-gateway/user/user.module';

@Module({
  imports: [UserModule, BoardModule],
})
export class ApiGatewayModule {}
