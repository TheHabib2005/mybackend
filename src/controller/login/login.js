import e from "express";
import { validationResult } from "express-validator";
import User from "../../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
const LoginController = async (req,res) =>{

    // Validate data here before calling SignUpService

    const error =  validationResult(req).array().map(err => {
        return {message: err.msg}
    })

    if(error.length){
        return res.status(400).json({
            success:false,
            message:error[0].message
        })
    };


    // get data from body 
 
    const {email,password} = await req.body;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){
        return res.status(400).json({
            success:false,
            message: "User not exist"
        })
    };

    const user = await User.findOne({email})

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message: "Password Enter a Corrcet Password"
        });
    }

    //create a token 

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    if(user){
        res.cookie('user-token', token, {
            maxAge: 900000,
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            domain: 'http://localhost:3000/'
        });
        
        return res.status(201).json({
            success:true,
            message: "User Login successfully",
            user:{email:user.email}
        })
        
    };
    
   
}

export default LoginController;