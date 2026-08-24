import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import type { Comment } from './comments.repository';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  findOneComment(@Param('id', ParseIntPipe) commentId: number): Comment {
    const selectedComment = this.commentsService.findById(commentId);
    if (!selectedComment) {
      throw new NotFoundException(`Comment with Id: ${commentId} not found.`);
    }
    return selectedComment;
  }

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) commentId: number) {
    const selectedComment = this.commentsService.deleteComment(commentId);
    if (!selectedComment) {
      throw new NotFoundException(`Comment with Id: ${commentId} not found.`);
    }
    return selectedComment;
  }
}
