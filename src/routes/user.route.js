import { Router } from "express";
import {registerUser} from "../controller/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router =  Router()

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),registerUser)

router.route("/test").get((req, res) => {
    res.send('Hello');
})

// router.post('/create', registerUser);



export default router 