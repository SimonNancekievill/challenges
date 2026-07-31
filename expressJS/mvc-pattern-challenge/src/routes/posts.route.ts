import { Router } from "express";
import { listPosts, showPost } from "../controller/posts.controller";

const router = Router();
router.get("/", listPosts);
router.get("/posts/:slug", showPost);

export default router;
