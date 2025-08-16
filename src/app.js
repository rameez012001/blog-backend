const express = require("express");
const sequelize = require("./database");
const postController = require("./controller/PostController");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/posts", (req, res) => {
  postController.getPosts(req, res);
});

app.post("/posts", (req, res) => {
  postController.createPost(req, res);
});


const PORT = process.env.PORT || 4000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
