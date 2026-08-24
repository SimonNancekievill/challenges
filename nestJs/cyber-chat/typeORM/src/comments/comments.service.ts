import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
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
    const comments = await this.comments.find({
      where: { threadId: threadId },
    });
    return this.comments.save(comments);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.comments.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
