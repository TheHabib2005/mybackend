import mongoose from "mongoose";



const conncetDB = async (url) =>{
    // try {
    //     await mongoose.connect(url,{  useNewUrlParser: true,
    //         useUnifiedTopology: true});
    //     console.log("MongoDB Connected...");
    // } catch (error) {
    //     console.error(`Error connecting to MongoDB: ${error.message}`);
    //     process.exit(1);
    // }
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Reduce the timeout to 5 seconds
    }).then(res => console.log("db connect")).catch(err => {
        console.error('Mongoose connection error:', err.message)
        process.exit(1);
    });
    
}

export default conncetDB;
