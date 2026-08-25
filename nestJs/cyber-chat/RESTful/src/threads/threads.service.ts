import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { UpdateThreadDto } from './dtos/updateThread.dto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadsRepository: Repository<Thread>,
  ) {}

  findAll(): Promise<Thread[]> {
    return this.threadsRepository.find();
  }

  findById(threadId: string): Promise<Thread | null> {
    return this.threadsRepository.findOneBy({ id: threadId });
  }

  create(title: string, author: string, body: string): Promise<Thread> {
    if (!title) {
      throw new BadRequestException('Title is required.');
    }
    if (!author) {
      throw new BadRequestException('Author is required.');
    }
    if (!body) {
      throw new BadRequestException('Body is required.');
    }

    const newThread = this.threadsRepository.create({ title, author, body });
    return this.threadsRepository.save(newThread);
  }

  async update(threadId: string, dto: UpdateThreadDto): Promise<Thread | null> {
    await this.threadsRepository.update(threadId, dto);
    return this.threadsRepository.findOneBy({ id: threadId });
  }

  async delete(threadId: string): Promise<boolean> {
    const result = await this.threadsRepository.delete(threadId);
    return (result.affected ?? 0) > 0;
  }
}
