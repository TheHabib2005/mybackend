import mongoose from "mongoose";



const conncetDB = async (url) =>{
    try {
        await mongoose.connect(url,{  useNewUrlParser: true,
            useUnifiedTopology: true});
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default conncetDB;
