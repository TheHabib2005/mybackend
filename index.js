import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import conncetDB from "./src/config/dbconncet.js";
import Product from "./src/model/product.model.js";
import { delay } from "./utils/index.js";
import SignUpController from "./src/controller/signup/signup.js";
import { userLoginValidator, userRegistrationValidator } from "./utils/express-validator.js";
import LoginController from "./src/controller/login/login.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
const app = express()


let PORT = process.env.PORT || 8000;
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
conncetDB("mongodb+srv://cdxhabib:poiuuiop@cluster0.rr7ldlq.mongodb.net/next-js-projcets?retryWrites=true&w=majority&appName=Cluster0")
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
app.use(cors())
app.use(cookieParser());
dotenv.config()
app.get('/', (req, res) => {
    res.json({message:"succes "})
})

// app.get('/products', async(req, res) => {
//     let {q} = await req.query;
//     let product = await Product.find({
//         $or: [
//           { title: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in title
//           { description: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in description
//           { tags: { $in: [q || ""] } } // Search within tags array
//         ]
//       })
 

//     res.json({product: product})
// })

// app.get('/products/search', async(req, res) => {
//     let {q} = await req.query;
//     let product = await Product.find({
//         $or: [
//           { title: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in title
//           { description: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in description
//           { tags: { $in: [q || ""] } } // Search within tags array
//         ]
//       })
 
//     res.json({product: product})
// })

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error) {
        // Handle Mongoose-specific errors
        console.error('Mongoose error:', err.message);
        res.status(500).json({ success:false, message: 'Database error occurred. Please try again later.'});

    } else {
        // Handle other errors
        console.error('General error:', err.message);
        res.status(500).json({ success:false, message: 'something was wrong! Please try again later.'});
    }
});


app.post("/user/signup",userRegistrationValidator, SignUpController);

app.post("/user/login",userLoginValidator, LoginController);