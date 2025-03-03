
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
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
            division:{
                type: String,
                default: [],
            },
            distric:{
                type: String,
                default: [],
            },
            island:{
                type: String,
                default: [],
            }

        }
    },
    clubProfile: {
        sportType: {
            type: String,
            default: "",
        },
        ageRange: {
            type: Number,
            default: null,
        },
        opportunities: {
            type: String,
            defult: null
        }
    }

},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;