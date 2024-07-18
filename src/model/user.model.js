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
    provider:{
        type:String,
        required:true,
        enum:['local', 'google', 'facebook']
    },
    profilePic:{
        type:String,
        default : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1721262342~exp=1721262942~hmac=e06295283ffe472144694baf4f92faa26026d67870f7856923a8322d78727ff7"
    }

 
},{timestamps:true})

const User = mongoose.model('User', userSchema);


export default User;