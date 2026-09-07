import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { ThreadsModule } from '../threads/threads.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Thread } from 'src/threads/entity/thread.entity';
import { Comment } from 'src/comments/entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        // database: config.get<string>('DATABASE_PATH'),
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DATABASE'),
        ssl: true,
        synchronize: true,
        entities: [User, Comment, Thread],
        logging: true,
      }),
    }),

    CommentsModule,
    ThreadsModule,
    AuthModule,
  ],
})
export class AppModule {}
