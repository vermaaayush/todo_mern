import { Router } from "express";
// import {loginUser, registerUser, logoutUser, currect_user, refreshAccessToken, update_password, profile_update} from "../controller/user.controller.js"
// import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { test, createTodo, updateTodo, allTodo, deleteTodo, shareTodo, retr_todo, trashTodo, deletetrashTodo, view_todo } from "../controller/todo.controller.js";

const router =  Router()

router.route("/test").get(test)

router.route('/createTodo').post(verifyJWT,createTodo)

router.route('/updateTodo/:xx').post(verifyJWT,updateTodo)

router.route('/allTodo').get(verifyJWT,allTodo)

router.route('/deleteTodo/:xx').delete(deleteTodo)

router.route('/shareTodo/:todo_id').post(verifyJWT,shareTodo)

router.route('/retr_todo/:todo_id').post(verifyJWT,retr_todo)

router.route('/view_todo/:todo_id').get(view_todo)

router.route('/trashTodo').get(verifyJWT,trashTodo)

router.route('/deletetrashTodo/:xx').delete(verifyJWT,deletetrashTodo)

export default router 