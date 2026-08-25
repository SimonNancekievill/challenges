import { Injectable } from '@nestjs/common';
import { initialThreads } from 'src/data';
import type { Comment } from 'src/comments/comments.repository';

type id = number;

export type Thread = {
  id?: id;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
};

export type ThreadWithComments = Thread & {
  comments: Comment[];
};

export type ThreadPayload = {
  title: string;
  author: string;
  body: string;
};

@Injectable()
export class ThreadsRepository {
  private readonly threads: Map<id, Thread> = new Map();
  constructor() {
    let id = 0;
    for (const thread of initialThreads) {
      id++;
      this.threads.set(id, {
        id,
        ...thread,
        createdAt: new Date(thread.createdAt),
      });
    }
  }

  findAll() {
    return [...this.threads.values()];
  }

  findById(threadId: number): Thread | undefined {
    return this.threads.get(threadId);
  }

  create(data: ThreadPayload): Thread {
    const id = Number(new Date());
    const newThread: Thread = { id: id, ...data, createdAt: new Date() };
    this.threads.set(id, newThread);
    return newThread;
  }

  delete(threadId: number): boolean {
    return this.threads.delete(threadId);
  }
}
