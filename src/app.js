import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN
    }
))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())




import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"

app.use("/users",userRouter)
app.use("/todo",todoRouter)

export {app}