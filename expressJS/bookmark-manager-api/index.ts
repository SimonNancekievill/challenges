import express from "express";

interface Bookmark {
  id: number;
  url: string;
  title: string;
  tag?: string;
}

let bookmarks: Bookmark[] = [
  { id: 1, url: "https://expressjs.com", title: "Express.js", tag: "node" },
  {
    id: 2,
    url: "https://typescriptlang.org",
    title: "TypeScript",
    tag: "typescript",
  },
  { id: 3, url: "https://developer.mozilla.org", title: "MDN Web Docs" },
];

const app = express();

const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server is runnning at http://localhost:${port}`);
});
