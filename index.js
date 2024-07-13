import express from "express"
import cors from "cors"
import conncetDB from "./src/config/dbconncet.js";
import Product from "./src/model/product.model.js";
import { delay } from "./utils/index.js";
import SignUpController from "./src/controller/signup/signup.js";
import { userLoginValidator, userRegistrationValidator } from "./utils/express-validator.js";
import LoginController from "./src/controller/login/login.js";

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


app.post("/user/signup",userRegistrationValidator, SignUpController);

app.post("/user/login",userLoginValidator, LoginController);