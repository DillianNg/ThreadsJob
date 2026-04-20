const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let POSTS = [
  {
    id: "1",
    content: "Hiring React Intern Remote - Web3 startup",
    url: "https://threads.net/example1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    content: "Looking for backend Node.js developer",
    url: "https://threads.net/example2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

function scorePost(post, keywords) {
  let score = 0;

  const text = post.content.toLowerCase();

  keywords.forEach((k) => {
    if (text.includes(k)) score += 5;
  });

  // recency boost
  const hours =
    (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60);
  score += Math.max(0, 5 - hours);

  return score;
}

function highlight(text, keywords) {
  let result = text;
  keywords.forEach((k) => {
    const regex = new RegExp(`(${k})`, "gi");
    result = result.replace(regex, "<b>$1</b>");
  });
  return result;
}

app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const keywords = q.split(" ").filter(Boolean);

  const results = POSTS.map((p) => ({
    ...p,
    score: scorePost(p, keywords),
    content: highlight(p.content, keywords),
  }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  res.json(results);
});

app.listen(4000, () => {
  console.log("API running on 4000");
});
