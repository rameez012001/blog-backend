const express = require("express");
const pool = require("./database");
const postController = require("./controller/PostController");

const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const {
  JWT_SECRET,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ALLOWED_ORIGIN,
  PORT = 10000
} = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 50,
  message: "Hold Your Horses, Man. Don't make too many requests"
});

const issueAccessWebToken = (sub) => {
  return jwt.sign({ sub, role: "admin" }, JWT_SECRET, { algorithm: "HS256", expiresIn: "15m" });
}

const authBearer = (req, res, next) => {
  const hdr = req.headers.authorization || '';
  const [scheme, token] = hdr.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: "Missing Token!",error:"InvalidToken" });
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = payload;
    next();
  })
}

const app = express();
app.use(express.json());

app.use(limiter);
app.use(helmet());

const cors = require("cors");
app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (username !== ADMIN_USERNAME) return res.status(401).json({ message: "Invalid Credentials", error: "Unauthorized" });
    const validatePwd = await bcrypt.compare(password || '', ADMIN_PASSWORD);
    if (!validatePwd) return res.status(401).json({ message: "Invalid Credentials", error: "Unauthorized" });
    const accessToken = issueAccessWebToken(username);
    return res.status(200).json({ accessToken, tokenType: "Bearer", expiresIn: 900, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({
      error: "ServerError",
      message: "Something went wrong"
    });
  }
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
