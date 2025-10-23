import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";


import PostController from "./controller/PostController.js";
import LoginController from "./controller/LoginController.js";
import authBearer from "./middleware/authToken.js";

const postController = new PostController();
const loginController = new LoginController();

const {
  ALLOWED_ORIGIN,
  PORT = 10000
} = process.env;


const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 50,
  message: "Hold Your Horses, Man. Don't make too many requests"
});

const app = express();

app.use(express.json());

app.use(limiter);
app.use(helmet());

app.use(cookieParser());


app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.post('/login', async (req, res) => {
  loginController.adminLogin(req,res);
})

app.post('/logout',authBearer, (req,res)=>{
  loginController.logout(req,res);
});

app.get('/auth-verify',authBearer,(req,res)=>{
  res.sendStatus(200);
})

app.get("/posts", (req, res) => {
  postController.getPosts(req, res);
});

app.post("/postablog", authBearer, (req, res) => {
  postController.createPost(req, res);
});

app.delete("/post", authBearer, (req, res) => {
  postController.deletePostById(req, res);
})

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
