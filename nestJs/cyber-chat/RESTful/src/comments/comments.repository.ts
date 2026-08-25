import { Injectable, NotFoundException } from '@nestjs/common';
import { initialComments } from 'src/data';

type id = number;

export type Comment = {
  id: number;
  threadId: number;
  author: string;
  body: string;
  createdAt: Date;
};

export type CommentPayload = {
  author: string;
  body: string;
};

@Injectable()
export class CommentsRepository {
  private readonly comments: Map<id, Comment> = new Map();
  constructor() {
    let id = 0;
    for (const comment of initialComments) {
      id++;
      this.comments.set(id, {
        ...comment,
        createdAt: new Date(comment.createdAt),
      });
    }
  }

  findAll(): Comment[] {
    return [...this.comments.values()];
  }

  findById(id: number): Comment | undefined {
    return this.comments.get(id);
  }

  delete(id: number): boolean {
    if (!id) {
      throw new NotFoundException(`ThreadId: ${id} not found`);
    }
    return this.comments.delete(id);
  }
}
