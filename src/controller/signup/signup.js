import e from "express";
import { validationResult } from "express-validator";
import User from "../../model/user.model.js";

const SignUpController = async (req,res) =>{

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
 
    const {email,password,username} = await req.body;

    const isUserExist = await User.findOne({email});

    if(isUserExist){
        return res.status(400).json({
            success:false,
            message: "User already exist"
        })
    };

    const user = await User.create({email,password,username,role:"user",})

    if(user){
        return res.status(201).json({
            success:true,
            message: "User created successfully",
        })
        

    };
    
   
}

export default SignUpController;