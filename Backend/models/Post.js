const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  profileImage: String,
  name: String,
  profession: String,
  content: String,
  stats: {
    points: Number,
    assists: Number,
    games: Number,
  },
  tags: [String],
  image: String,
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
