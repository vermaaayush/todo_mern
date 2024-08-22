import dotenv from "dotenv"
import connection from "./db/index.js";
import {app} from "./app.js";
dotenv.config({
    path: './env'
})

connection()
.then(()=>{
    const port= process.env.PORT || 8000;

    app.listen(port, ()=>`Server is running on port ${port}`);
})
.catch((err) =>{
    console.log("Database connection failed",err);
})