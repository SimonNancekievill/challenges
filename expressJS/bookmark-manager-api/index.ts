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

app.get("/bookmarks", (req, res) => {
  res.send(bookmarks);
});

app.get("/bookmarks/:id", (req, res) => {
  const id = req.params.id;

  const bookmark =
    bookmarks.find((bookmark) => bookmark.id.toString() === id) || null;

  if (!bookmark) {
    res.status(404).json({ error: "Bookmark not found" });
    return;
  }

  res.send(bookmark);
});

app.listen(port, () => {
  console.log(`Server is runnning at http://localhost:${port}`);
});
