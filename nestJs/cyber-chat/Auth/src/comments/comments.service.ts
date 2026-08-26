import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/createComment.dto';
import { ThreadsService } from '../threads/threads.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
    private readonly threadService: ThreadsService,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.comments.find();
  }

  findById(id: string): Promise<Comment | null> {
    return this.comments.findOneBy({ id: id });
  }

  async deleteComment(id: string): Promise<Comment | undefined | void> {
    const comment = await this.comments.findOneBy({ id: id });
    if (!comment) return undefined;
    comment.body = 'deleted';
    return this.comments.save(comment);
  }

  async findByThreadId(threadId: string): Promise<Comment[] | null> {
    return this.comments.find({
      where: { threadId: threadId },
    });
  }

  async create(threadId: string, dto: CreateCommentDto): Promise<Comment> {
    const thread = await this.threadService.findById(threadId);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found.`);
    }
    const comment = this.comments.create({
      ...dto,
      thread,
    });
    return this.comments.save(comment);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.comments.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
