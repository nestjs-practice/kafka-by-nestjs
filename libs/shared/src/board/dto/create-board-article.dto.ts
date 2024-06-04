import { IsInt, IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateBoardArticleDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Max(200)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
