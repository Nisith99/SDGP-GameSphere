import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true 
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    location: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    playerProfile: {
        age: {
            type: Number,
            default: null
        },
        sport: {
            type: String,
            default: "",
        },
        skills: {
            type: [String],
            default: [],
        },
        participateMatchesCount: {
            type: Number,
            default: null,
        },
        BestAchivements: {
            type: [String],
            default: [],
        },
        achievements: {
            province:{
                type: [String],
                default: [],
            },
            district:{
                type: [String],
                default: [],
            },
            island:{
                type: [String],
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
            default: null
        },
        rating: [ {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rate: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            }
        }],
        avgRating: {
            type: Number,
            default: 0
        }
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;