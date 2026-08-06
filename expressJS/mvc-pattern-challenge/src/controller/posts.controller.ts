import { Response, Request } from "express";
import {
  slugify,
  formatDate,
  loadPosts,
  PAGE_SIZE,
  createBlogEntry,
} from "../models/post.model";

export async function listPosts(req: Request, res: Response) {
  const posts = await loadPosts();
  const authorFilter =
    typeof req.query.author === "string" ? req.query.author.trim() : "";
  const sort = req.query.sort === "oldest" ? "oldest" : "newest";
  const page =
    typeof req.query.page === "string" &&
    Number.isInteger(Number(req.query.page))
      ? Math.max(1, Number(req.query.page))
      : 1;

  const filteredPosts = authorFilter
    ? posts.filter((post) =>
        post.author.toLowerCase().includes(authorFilter.toLowerCase()),
      )
    : posts;

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === "oldest") {
      return a.createdAt - b.createdAt;
    }
    return b.createdAt - a.createdAt;
  });

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedPosts = sortedPosts.slice(start, start + PAGE_SIZE);

  const view = pagedPosts.map((post) => ({
    ...post,
    slug: slugify(post.title),
    createdAt: formatDate(post.createdAt),
  }));

  res.render("src/views/index.html", {
    posts: view,
    controls: {
      author: authorFilter,
      sort,
      page: currentPage,
      totalPages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    },
  });
}

export async function showPost(req: Request, res: Response) {
  const slug = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }

  const posts = await loadPosts();
  const post = posts.find((p) => slugify(p.title) === slug);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("src/views/post.html", {
    post: { ...post, createdAt: formatDate(post.createdAt) },
  });
}
export async function createPost(req: Request, res: Response) {
  const { title, teaser, author, image, content } = req.body;

  if (!title || !teaser || !author || !image || !content) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newId = await createBlogEntry({
    title,
    teaser,
    author,
    content,
    image: image ?? null,
    createdAt: Math.floor(Date.now() / 1000),
  });
  res.status(201).json({ id: newId });
}
