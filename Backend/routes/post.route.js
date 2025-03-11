import express from "express";
import Post from "../models/Post.js";
import Notifications from "../models/Notification.model.js";

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  try {
    console.log("Creating new post:", req.body);
    const newPost = new Post({
      content: req.body.content,
      name: req.body.name || "Temporary User",
      profileImage: req.body.profileImage || "https://via.placeholder.com/40",
      profession: req.body.profession || "Gamer"
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all posts");
    const posts = await Post.find()
      .sort({ createdAt: -1 });
    console.log(`Found ${posts.length} posts`);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: error.message });
  }
});

// Like/Unlike a post
router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const userId = req.body.userId || "temp_user_id";
    const likeIndex = post.likes.indexOf(userId);
    
    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a post
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      content: req.body.content,
      author: {
        _id: req.body.userId || "temp_user_id",
        name: req.body.userName || "Temporary User",
        avatar: req.body.userAvatar
      },
      likes: [],
      replies: []
    };

    post.comments.push(newComment);
    await post.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
