import express from "express";
import nunjucks from "nunjucks";

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});

app.get("/", (req, res) => {
  res.render("index.njk");
});

app.get("/events", (req, res) => {
  res.render("events.njk", {
    events: [
      {
        name: "React Conf",
        date: "June 10, 2025",
        location: "Berlin",
        soldOut: true,
      },
      {
        name: "Vue.js Summit",
        date: "July 2, 2025",
        location: "Amsterdam",
        soldOut: true,
      },
      {
        name: "Node.js Interactive",
        date: "August 15, 2025",
        location: "London",
        soldOut: false,
      },
    ],
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
