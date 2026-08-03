import { Router, Request, Response } from "express";

const router = Router();

router.get("/contact", (req: Request, res: Response) => {
  res.render("src/views/contact.html");
});

router.get("/about", (req: Request, res: Response) => {
  res.render("src/views/about.html");
});

router.get("/example-post", (req: Request, res: Response) => {
  res.render("src/views/postExample.html");
});

export default router;
