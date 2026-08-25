import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ThreadsService } from 'src/threads/threads.service';
import { Thread } from 'src/threads/entities/thread.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Thread]),
  ],
  providers: [CommentsService, ThreadsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
