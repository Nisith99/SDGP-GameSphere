import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    bannerImg: { type: String, default: "" },
    headline: { type: String, default: "Player", maxLength: 100, index: true },
    location: { type: String, default: "Sri Lanka" },
    about: { type: String, default: "", maxLength: 500 },
    sport: { type: String, default: "", index: true },
    skills: { type: [String], default: [], index: true },
    experience: [
      { title: { type: String, required: true }, company: { type: String }, startDate: { type: Date }, endDate: { type: Date }, description: { type: String, maxLength: 300 }, _id: false },
    ],
    education: [
      { school: { type: String, required: true }, fieldOfStudy: { type: String }, startYear: { type: Number }, endYear: { type: Number }, _id: false },
    ],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ratings: [
      { ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, score: { type: Number, required: true, min: 1, max: 5 }, comment: { type: String, default: "" }, createdAt: { type: Date, default: Date.now } },
    ],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    achievements: [
      { rankType: { type: String, enum: ["district", "island", "province"], required: true }, rankValue: { type: String, required: true }, score: { type: Number, required: true }, _id: { type: String } },
    ],
  },
  { timestamps: true }
);

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