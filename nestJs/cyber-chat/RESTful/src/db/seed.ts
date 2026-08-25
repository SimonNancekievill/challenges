import { Comment } from '../comments/entities/comment.entity';
import { Thread } from '../threads/entities/thread.entity';
import { AppDataSource } from './data-source';
import { initialThreads, initialComments } from './seed-data';

(async () => {
  const ds = await AppDataSource.initialize();
  await ds.synchronize(true); // drop data + recreate db, guaranteed clean slate

  const threadRepo = ds.getRepository(Thread);
  const commentRepo = ds.getRepository(Comment);

  const threads = await threadRepo.save(initialThreads);
  console.log(`Created ${threads.length} threads`);

  const comments = initialComments.map((comment) =>
    commentRepo.create({
      thread: threads[comment.threadIndex],
      author: comment.author,
      body: comment.body,
    }),
  );
  const savedComments = await commentRepo.save(comments);
  console.log(`Created ${savedComments.length} comments`);
  await ds.destroy();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
