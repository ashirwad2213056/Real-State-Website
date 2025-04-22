import mongoose from "mongoose";
// import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // unique: true,
    },
    avatar:{
        type: String,
        default: "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png",
    },

}, {timestamps: true } );

const User = mongoose.model('User', userSchema);

export default User;



