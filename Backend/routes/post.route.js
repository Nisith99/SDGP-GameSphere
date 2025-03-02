import express from "express";
import { createPost, getPosts, likePost, addComment } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost); // Create a new post
router.get("/", getPosts); // Get all posts
router.put("/:postId/like", likePost); // Like a post
router.post("/:postId/comment", addComment); // Add comment to a post

export default router;
