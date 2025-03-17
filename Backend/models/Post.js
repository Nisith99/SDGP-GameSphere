import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 500
  },
  author: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 1000
  },
  author: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    avatar: String
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  profileImage: String,
  name: {
    type: String,
    required: true
  },
  profession: String,
  content: {
    type: String,
    required: true,
    maxLength: 2000
  },
  tags: [String],
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  isLiked: { type: Boolean, default: false }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.index({ content: "text" });  

const Post = mongoose.model("Post", postSchema);

export default Post;
