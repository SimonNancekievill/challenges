import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postRoutes from "./routes/posts.route";
import navRoutes from "./routes/nav.route";
import { connectDB, closeDB } from "./db/database";

const app = express();

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");
nunjucks.configure(projectRoot, { autoescape: true, express: app });
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

app.use(postRoutes);
app.use(navRoutes);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
