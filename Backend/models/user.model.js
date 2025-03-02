
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fulltName:{
        type: String,
        require: true 
    },
    userName: {
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
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    playerProfile: {
        sport: {
            type: String,
            default: "",
        },
        skills: {
            type: [String],
            default: [],
        },
        achievements: {
            type: [String],
            default: [],    
        }
    },
    clubProfile: {
        sportType: {
            type: String,
            default: "",
        },
        stratedYear: {
            type: Number,
            default: null,
        }
    }

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;