import express from "express"
import cors from "cors"
import conncetDB from "./src/config/dbconncet.js";
import Product from "./src/model/product.model.js";

const app = express()


let PORT = process.env.PORT || 8000;

conncetDB("mongodb+srv://cdxhabib:poiuuiop@cluster0.rr7ldlq.mongodb.net/next-js-projcets?retryWrites=true&w=majority&appName=Cluster0")
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
app.use(cors())

app.get('/', (req, res) => {
    res.json({message:"succes "})
})

app.get('/products', async(req, res) => {
    let {q} = await req.query;
    let product = await Product.find({
        $or: [
          { title: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in title
          { description: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in description
          { tags: { $in: [q || ""] } } // Search within tags array
        ]
      })
 

    res.json({product: product})
})


app.get('/products/search', async(req, res) => {
    let {q} = await req.query;
    let product = await Product.find({
        $or: [
          { title: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in title
          { description: { $regex: q || "", $options: 'i' } }, // Case-insensitive search in description
          { tags: { $in: [q || ""] } } // Search within tags array
        ]
      })
 
    res.json({product: product})
})