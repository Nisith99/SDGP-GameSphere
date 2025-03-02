import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    profilePic: { type: String },
    content: { type: String, required: true },
    image: { type: String },
    likes: { type: Number, default: 0 },
    comments: [{ userId: String, text: String }],
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
