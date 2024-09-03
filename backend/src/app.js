import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from 'express-session';


const app = express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(session({
    secret: '11223344556677889900', // Replace with a random secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    }
  }));




import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"

app.use("/users",userRouter)
app.use("/todo",todoRouter)

export {app}