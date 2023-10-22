import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        
        console.log(`Connect to MongoDb ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error ${error}`);
    }
}

export default connectDB;