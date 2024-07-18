import { checkSchema } from "express-validator";

export const userRegistrationValidator = checkSchema({
  username: {
    notEmpty: {
      errorMessage: 'Username is required',
    },
    isLength: {
      options: { min:5,max: 10 },
      errorMessage: 'Username must be 5 characters and less than 30 characters',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email address',
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
});


export const userLoginValidator = checkSchema({
  email: {
    isEmail: {
      errorMessage: 'Invalid email address',
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
});

export const GoogleLoginValidator = checkSchema({
  username: {
    notEmpty: {
      errorMessage: 'Username is required',
    },
  },
  profilePic: {
    notEmpty: {
      errorMessage: 'profilePic is required',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email address',
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
});