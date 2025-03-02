import Post from "../models/post.model.js";

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { userId, username, profilePic, content, image } = req.body;

        const newPost = new Post({ userId, username, profilePic, content, image });
        await newPost.save();

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all posts (sorted by latest)
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Like a post
export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likes += 1;
        await post.save();

        res.json({ message: "Post liked!", likes: post.likes });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, text } = req.body;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push({ userId, text });
        await post.save();

        res.json({ message: "Comment added!", comments: post.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error" });
    }
};
