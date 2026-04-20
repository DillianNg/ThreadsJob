const axios = require("axios");

const POSTS = [];

async function fetchMock() {
  // giả lập data
  POSTS.push({
    id: Date.now().toString(),
    content: "Hiring React Intern - Remote - DM me",
    url: "https://threads.net/example",
    createdAt: new Date().toISOString(),
  });

  console.log("Fetched new post");
}

setInterval(fetchMock, 10000);
