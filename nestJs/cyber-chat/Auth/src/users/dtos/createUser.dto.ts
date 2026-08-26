import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  username!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
