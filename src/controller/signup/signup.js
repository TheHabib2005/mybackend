import e from "express";
import { validationResult } from "express-validator";
import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";
const SignUpController = async (req, res, next) => {
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

  const { email, password, username } = await req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  //hashing password
  var salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      role: "user",
    });
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (error) {
    next(err);
  }
};

export default SignUpController;
