import { getDB } from "../db/database";

export interface Post {
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
