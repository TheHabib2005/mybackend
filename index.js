import express from "express"
import dotenv from "dot-env"
import conncetDB from "./src/config/dbconncet.js";
import Product from "./src/model/product.model.js";
const app = express()


let PORT = process.env.PORT || 8000;
// dotenv.config()
conncetDB("mongodb+srv://cdxhabib:poiuuiop@cluster0.rr7ldlq.mongodb.net/next-js-projcets?retryWrites=true&w=majority&appName=Cluster0")
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.json({message:"succes "})
})

app.get('/products', async(req, res) => {
    let product = await Product.find();
 
    res.json({product: product})
})