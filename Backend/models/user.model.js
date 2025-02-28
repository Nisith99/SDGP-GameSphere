
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true 
    },
    lastName: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["player", "club"],
        default: null
    }

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;