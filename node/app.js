import "dotenv/config";
import express from "express";

import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
  console.log('sent html page')
});

app.listen(PORT, () => {
  console.log("running, port: " + PORT);
});