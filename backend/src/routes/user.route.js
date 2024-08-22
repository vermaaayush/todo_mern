import { Router } from "express";
import {loginUser, registerUser, logoutUser, currect_user, refreshAccessToken, update_password, profile_update} from "../controller/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

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

router.route("/login").post(loginUser)


router.route("/logout").post(verifyJWT, logoutUser)

router.route("/currect_user").get(verifyJWT, currect_user)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/update-password").post(verifyJWT,update_password)

router.route("/profile-update").post(verifyJWT,upload.single("avatar"),profile_update)


export default router 