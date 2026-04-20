const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let POSTS = []; // mock DB

app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  const results = POSTS
    .filter(p => p.content.toLowerCase().includes(q))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  res.json(results);
});

app.listen(4000, () => {
  console.log("API running on 4000");
});
