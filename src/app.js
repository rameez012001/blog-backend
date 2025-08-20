const express = require("express");
const pool = require("./database");
const postController = require("./controller/PostController");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.get("/posts", (req, res) => {
  postController.getPosts(req, res);
});

app.post("/postablog", (req, res) => {
  postController.createPost(req, res);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
