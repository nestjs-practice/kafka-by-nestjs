import { IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateBoardArticleDto {
  @IsNotEmpty()
  @IsString()
  @Max(200)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
