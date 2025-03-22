import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove unnecessary whitespace
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensure consistency in searches
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bannerImg: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "Player",
      maxLength: 100, // Limit length for brevity
    },
    location: {
      type: String,
      default: "Sri Lanka", // Corrected typo from "SriLanka"
    },
    about: {
      type: String,
      default: "",
      maxLength: 500, // Limit bio length
    },
    sport: {
      type: String,
      default: "",
      index: true, // Index for faster search queries
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String, maxLength: 300 },
        _id: false, // Avoid generating _id for subdocuments if not needed
      },
    ],
    education: [
      {
        school: { type: String, required: true },
        fieldOfStudy: { type: String },
        startYear: { type: Number },
        endYear: { type: Number },
        _id: false,
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active", // Track user account status
    },
  },
  {
    timestamps: true, // Keep createdAt and updatedAt
  }
);

// Indexes for search performance
userSchema.index({ username: 1 }); // Single-field index for username
userSchema.index({ name: "text", username: "text", sport: "text" }); // Text index for full-text search

const User = mongoose.model("User", userSchema);

export default User;