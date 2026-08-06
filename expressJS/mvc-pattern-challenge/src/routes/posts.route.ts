import { Router } from "express";
import {
  listPosts,
  showPost,
  createPost,
} from "../controller/posts.controller";

const router = Router();

router.get("/", listPosts);
router.get("/posts/:slug", showPost);
router.post("/posts", createPost);
// router.patch("/:id", ed);

export default router;
