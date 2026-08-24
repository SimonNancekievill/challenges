import { BadRequestException, Injectable } from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';
import type { Thread } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly threadsRepository: ThreadsRepository) {}

  findAll(): Thread[] {
    return this.threadsRepository.findAll();
  }

  findById(threadId: number): Thread | undefined {
    return this.threadsRepository.findById(threadId);
  }

  create(title: string, author: string, body: string): Thread {
    if (!title) {
      throw new BadRequestException('Title is required.');
    }
    if (!author) {
      throw new BadRequestException('Author is required.');
    }
    if (!body) {
      throw new BadRequestException('Body is required.');
    }

    return this.threadsRepository.create({ title, author, body });
  }

  delete(threadId: number): boolean {
    return this.threadsRepository.delete(threadId);
  }
}
