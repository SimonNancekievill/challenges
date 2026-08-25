import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  Delete,
  ParseUUIDPipe,
  Patch,
  SerializeOptions,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CommentsService } from 'src/comments/comments.service';
import { CreateThreadDto } from './dtos/createThread.dto';
import { Thread } from './entities/thread.entity';
import { UpdateThreadDto } from './dtos/updateThread.dto';
import { ThreadResponseDto } from './dtos/threadResponse.dto';
import { ThreadWithCommentsDto } from './dtos/threadWithComments.dto';
import { CommentsResponseDto } from 'src/comments/dtos/commentsResponse.dto';
import { CreateCommentDto } from 'src/comments/dtos/createComment.dto';
import { Comment } from 'src/comments/entities/comment.entity';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @SerializeOptions({ type: ThreadResponseDto })
  async findAllThreads(): Promise<Thread[]> {
    return this.threadsService.findAll();
  }

  @Get(':id')
  @SerializeOptions({ type: ThreadWithCommentsDto })
  async findOneThread(@Param('id', ParseUUIDPipe) threadId: string) {
    const selectedThread = await this.threadsService.findById(threadId);
    if (!selectedThread) {
      throw new NotFoundException(`Thread with Id: ${threadId} not found.`);
    }
    const threadComments = await this.commentsService.findByThreadId(threadId);
    return { ...selectedThread, comments: threadComments };
  }

  @Post()
  @SerializeOptions({ type: ThreadWithCommentsDto })
  createThread(@Body() threadPayload: CreateThreadDto) {
    return this.threadsService.create(
      threadPayload.title,
      threadPayload.author,
      threadPayload.body,
    );
  }

  @Post('/:id/comments')
  @SerializeOptions({ type: CommentsResponseDto })
  async createComment(
    @Param('id', ParseUUIDPipe) threadId: string,
    @Body() dto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(threadId, dto);
  }

  @Patch(':id')
  @SerializeOptions({ type: ThreadResponseDto })
  async updateThread(
    @Param('id', ParseUUIDPipe) threadId: string,
    @Body() dto: UpdateThreadDto,
  ): Promise<Thread | null> {
    const thread = await this.threadsService.update(threadId, dto);

    return thread;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteThread(
    @Param('id', ParseUUIDPipe) threadId: string,
  ): Promise<void> {
    const threadComments = await this.commentsService.findByThreadId(threadId);
    await Promise.all(
      threadComments!.map((comment) => this.commentsService.delete(comment.id)),
    );

    const deletedThread = await this.threadsService.delete(threadId);
    if (!deletedThread) {
      throw new NotFoundException(`thread with ID: ${threadId} not found.`);
    }
  }
}
