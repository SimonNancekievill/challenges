import { getDB } from "../db/database";

export interface Post {
  id: number;
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

export const PAGE_SIZE = 2;

export async function loadPosts(): Promise<Post[]> {
  return await getDB().all<Post[]>("SELECT * FROM posts");
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function createBlogEntry(
  entry: Omit<Post, "id">,
): Promise<number> {
  const db = getDB();
  const result = await db.run(
    `
        INSERT INTO posts (title, teaser, author, createdAt, image,content) VALUES (@title, @teaser, @author, @createdAt, @image, @content)`,
    {
      "@title": entry.title,
      "@teaser": entry.teaser,
      "@author": entry.author,
      "@createdAt": entry.createdAt,
      "@image": entry.image,
      "@content": entry.content,
    },
  );
  return result.lastID!;
}

export async function updateBlogEntry(
  id: number,
  entry: Omit<Post, "id">,
): Promise<void> {
  const db = getDB();
  await db.run(
    `
  UPDATE posts SET title = @title WHERE id = @id
  `,
    {
      "@title": entry.title,
      "@id": id,
    },
  );
}
