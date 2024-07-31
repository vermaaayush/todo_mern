import connectDB from "./db/index.js";
import {app} from "./app.js"


connectDB()
.then(()=>{
    const port= process.env.PORT || 8000;

    app.listen(port, ()=>`Server is running on port ${port}`);
})
.catch((err) =>{
    console.log(err);
})