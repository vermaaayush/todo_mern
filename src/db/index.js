import mongoose from "mongoose"
import { DB_NAME } from "../constants"


const connection = async () =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log('MongoDB connected');
    } catch (error) {
        console.log("Mongodb coonection error",error);
        process.exit(1)
    }
}

export default connectDB