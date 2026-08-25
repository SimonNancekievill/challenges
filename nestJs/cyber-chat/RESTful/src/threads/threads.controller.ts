import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CommentsService } from 'src/comments/comments.service';

export type ThreadPayload = {
  title: string;
  author: string;
  body: string;
};

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
  async findOneThread(@Param('id', ParseUUIDPipe) threadId: string) {
    const selectedThread = await this.threadsService.findById(threadId);
    if (!selectedThread) {
      throw new NotFoundException(`Thread with Id: ${threadId} not found.`);
    }
    const threadComments = await this.commentsService.findByThreadId(threadId);
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
  async deleteThread(@Param('id', ParseUUIDPipe) threadId: string): Promise<{
    message: string;
  }> {
    const threadComments = await this.commentsService.findByThreadId(threadId);
    await Promise.all(
      threadComments!.map((comment) => this.commentsService.delete(comment.id)),
    );

    const deletedThread = await this.threadsService.delete(threadId);
    if (!deletedThread) {
      throw new NotFoundException(`thread with ID: ${threadId} not found.`);
    }
    return { message: `Thread with ID: ${threadId} deleted.` };
  }
}
