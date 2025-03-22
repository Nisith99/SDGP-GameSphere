import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    category: { type: String, enum: ["league", "club"], required: true },
    color: { type: String, default: "gray" },
    membersList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("League", leagueSchema);