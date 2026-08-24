import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async findOneComment(
    @Param('id', ParseUUIDPipe) commentId: string,
  ): Promise<Comment> {
    const selectedComment = await this.commentsService.findById(commentId);
    if (!selectedComment) {
      throw new NotFoundException(`Comment with Id: ${commentId} not found.`);
    }
    return selectedComment;
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseUUIDPipe) commentId: string) {
    const selectedComment = await this.commentsService.deleteComment(commentId);
    if (!selectedComment) {
      throw new NotFoundException(`Comment with Id: ${commentId} not found.`);
    }
    return selectedComment;
  }
}
