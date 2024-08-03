// import dotenv from 'dotenv';
import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
// dotenv.config();
console.log(DB_NAME);


const connection = async () =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${conn.connection.host}`);
    } catch (error) {
        console.log("Mongodb coonection error",error);
        process.exit(1)
    }
}

export default connection