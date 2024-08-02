// import dotenv from 'dotenv';
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
// dotenv.config();
console.log(process.env.MONGODB_URL);

console.log(process.env.PORT);
const connection = async () =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log('MongoDB connected');
    } catch (error) {
        console.log("Mongodb coonection error",error);
        process.exit(1)
    }
}

export default connection