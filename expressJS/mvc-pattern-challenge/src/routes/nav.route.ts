import { Router, Request, Response } from "express";

const router = Router();

router.get("/contact", (req: Request, res: Response) => {
  res.render("contact.html");
});

router.get("/about", (req: Request, res: Response) => {
  res.render("about.html");
});

router.get("/example-post", (req: Request, res: Response) => {
  res.render("postExample.html");
});

export default router;
