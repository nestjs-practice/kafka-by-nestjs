import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  birth?: Date;

  @IsString()
  @Min(1)
  @Max(13)
  phone: string;

  @IsBoolean()
  agreeEmail: boolean;

  @IsBoolean()
  agreeSms: boolean;
}
