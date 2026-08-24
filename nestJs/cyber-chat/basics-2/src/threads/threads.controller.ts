import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import type { ThreadPayload, ThreadWithComments } from './threads.repository';
import { CommentsService } from 'src/comments/comments.service';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  findAllThreads() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOneThread(
    @Param('id', ParseIntPipe) threadId: number,
  ): ThreadWithComments {
    const selectedThread = this.threadsService.findById(threadId);
    if (!selectedThread) {
      throw new NotFoundException(`Thread with Id: ${threadId} not found.`);
    }
    const threadComments = this.commentsService.findByThreadId(threadId);
    return { ...selectedThread, comments: threadComments };
  }

  @Post()
  createThread(@Body() threadPayload: ThreadPayload) {
    return this.threadsService.create(
      threadPayload.title,
      threadPayload.author,
      threadPayload.body,
    );
  }

  @Delete(':id')
  deleteThread(@Param('id', ParseIntPipe) threadId: number): {
    message: string;
  } {
    const deletedThread = this.threadsService.delete(threadId);
    if (!deletedThread) {
      throw new NotFoundException(`thread with ID: ${threadId} not found.`);
    }
    const deletedComments = this.commentsService.findByThreadId(threadId);
    if (!deletedComments) {
      throw new NotFoundException(
        `Comments with threadId: ${threadId} not found.`,
      );
    }

    deletedComments.forEach((comment) =>
      this.commentsService.delete(comment.id),
    );
    return { message: `Thread with ID: ${threadId} deleted.` };
  }
}
