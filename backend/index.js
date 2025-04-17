import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";
const uploadMiddleware = multer({ dest: "uploads/" });
import { UserSchema } from "./models/user.js";
import { PostSchema } from "./models/post.js";
import bcrypt from "bcrypt";
const jwt = await import("jsonwebtoken");
import cookieParser from "cookie-parser";
// const secretKey = "HelloThisIsNitinSapra";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    `mongodb+srv://${process.env.mongodb_Username}:${process.env.mongodb_Password}@cluster0.j3uy9v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error(err));
const User = mongoose.model("user", UserSchema);
const Post = mongoose.model("post", PostSchema);

console.log(process.env.mongodb_Username);

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let newUser = await User.create({
      username,
      password,
    });
    res.json(newUser);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const a = username;
    const usera = await User.findOne({ username: a });
    const aa = await bcrypt.compare(password, usera.password);
    if (aa) {
      const payload = { userId: usera._id, username: usera.username };
      const token = jwt.default.sign(payload, process.env.secretKey);
      res.cookie("token", token);
      res.status(200).json({ id: usera._id, name: usera.username });
    } else {
      //LoginFailed
      res.status(400).json("Wrong Credentials");
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.default.verify(token, process.env.secretKey);
  res.json(decoded);
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.json("Cleared");
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const { title, summary, content } = req.body;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  res.json({ ext });
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const newPost = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(newPost);
});

app.get("/post", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const aaa = req.params.id;
  const postt = await Post.findById(aaa);
  res.json(postt);
});

app.listen(5000, () => {
  console.log("Server is Listening on Port 5000");
});
