import { PartialType } from '@nestjs/mapped-types';
import { ThreadResponseDto } from './threadResponse.dto';
import { Expose, Type } from 'class-transformer';
import { CommentsResponseDto } from 'src/comments/dtos/commentsResponse.dto';

export class ThreadWithCommentsDto extends PartialType(ThreadResponseDto) {
  @Expose()
  @Type(() => CommentsResponseDto)
  comments!: CommentsResponseDto[];
}
