import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  author!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  body!: string;
}
