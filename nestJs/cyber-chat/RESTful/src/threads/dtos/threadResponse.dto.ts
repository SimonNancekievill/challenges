import { Expose, Type } from 'class-transformer';

export class ThreadResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  author!: string;

  @Expose()
  body!: string;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
}
