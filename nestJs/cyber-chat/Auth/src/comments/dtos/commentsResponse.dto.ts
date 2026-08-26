import { Expose, Type } from 'class-transformer';

export class CommentsResponseDto {
  @Expose()
  id!: string;

  @Expose()
  author!: string;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
