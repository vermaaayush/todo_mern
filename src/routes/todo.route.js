import { Router } from "express";
// import {loginUser, registerUser, logoutUser, currect_user, refreshAccessToken, update_password, profile_update} from "../controller/user.controller.js"
// import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { test, createTodo, updateTodo } from "../controller/todo.controller.js";

const router =  Router()

router.route("/test").get(test)

router.route('/createTodo').post(verifyJWT,createTodo)

router.route('/updateTodo/:xx').post(verifyJWT,updateTodo)

export default router 