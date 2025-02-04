const { Password } = require("@mui/icons-material");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;