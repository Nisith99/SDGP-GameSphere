import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost); // Create a new post
router.get("/", getPosts); // Get all posts

export default router;
