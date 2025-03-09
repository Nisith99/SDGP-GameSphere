import mongoose from "mongoose";

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

postSchema.index({ content: "text" });   // Fixed typo in variable name and spacing

const Post = mongoose.model("Post", postSchema);

export default Post;
