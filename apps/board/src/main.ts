import { NestFactory } from '@nestjs/core';
import { BoardModule } from './board.module';

async function bootstrap() {
  const app = await NestFactory.create(BoardModule);
  await app.listen(3000);
}
bootstrap();
