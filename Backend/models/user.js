const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: StrSing, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["player", "club"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
