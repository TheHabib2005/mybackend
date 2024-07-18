import e from "express";
import { validationResult } from "express-validator";
import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const saveGoogleUser = async (req, res) => {
  // Validate data here before calling SignUpService

  const error = validationResult(req)
    .array()
    .map((err) => {
      return { message: err.msg };
    });

  if (error.length) {
    return res.status(400).json({
      success: false,
      message: error[0].message,
    });
  }

  // get data from body

  const { email, password, username,profilePic } = await req.body;

  const isUserExist = await User.findOne({ email,provider:"google" });

  if (!isUserExist) {
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
        role: "user",
        isVerified: true,
        provider:"google",
        profilePic
      });

      
     

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });
      const expirationDate = new Date(Date.now() + 2 * 60 * 1000);
      if (user) {
        res.cookie("user-token", token, {
          expirationDate: expirationDate,
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        });
    
        return res.status(201).json({
          success: true,
          message: "User Login successfully",
          user: { email: user.email },
        });
      }

    } catch (error) {
      next(err);
    }
  }

  const user = await User.findOne({ email,provider:"google" });

  //create a token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  // const expirationDate = new Date(Date.now() + 2 * 60 * 1000);
  if (user) {
    res.cookie("user-token", token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User Login successfully",
      user: { email: user.email },
    });
  }
};

export default saveGoogleUser;
