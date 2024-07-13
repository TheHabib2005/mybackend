import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        maxlength: [10, 'password must be less than 30 characters'],
    },
    role:{
        type:String,
        required:true,
        enum:['admin', 'user']
    },
    isVerified:{
        type:Boolean,
        default:false
    },

 
},{timestamps:true})

const User = mongoose.model('User', userSchema);


export default User;