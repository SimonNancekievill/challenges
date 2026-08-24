import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import type { Comment } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  findAll(): Comment[] {
    return this.commentsRepository.findAll();
  }

  findById(id: number): Comment | undefined {
    return this.commentsRepository.findById(id);
  }

  deleteComment(id: number): Comment | undefined | void {
    const comment = this.commentsRepository.findById(id);
    if (!comment) return undefined;
    comment.body = 'deleted';
    return comment;
  }

  findByThreadId(threadId: number): Comment[] {
    return this.commentsRepository
      .findAll()
      .filter((comment) => comment.threadId === threadId);
  }

  delete(id: number): boolean {
    return this.commentsRepository.delete(id);
  }
}
