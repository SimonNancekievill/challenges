import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  author!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  body!: string;
}
