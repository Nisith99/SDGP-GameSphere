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
    // New rating fields
    ratings: [
      {
        ratedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    achievements: [
      {
        rankType: { type: String, enum: ["district", "island", "province"], required: true },
        rankValue: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true, // Keep createdAt and updatedAt
  }
);

// Pre-save middleware to calculate average rating
userSchema.pre("save", function (next) {
  if (this.ratings.length > 0) {
    const totalScore = this.ratings.reduce((sum, rating) => sum + rating.score, 0);
    this.averageRating = parseFloat((totalScore / this.ratings.length).toFixed(1));
    this.ratingCount = this.ratings.length;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;