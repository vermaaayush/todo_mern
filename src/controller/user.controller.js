import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/ApiErrors.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudnary.js"

const registerUser = asyncHandler( async (req,res) => {
     //get user  details from frontend
    //validation - not empty 
    //check user exist or not 
    //check for image and avatar 
    //create user object - create entry in db 
    // revome passwork and refresh token field from response
    // check for user creation 
    // return response 

    const {fullname, email, username, password} = req.body
    console.log("Received fields:", { fullname, email, username, password });
    if (!fullname || !email || !username || !password ) {
      throw new ApiErrors(400, "All fields are required");
    }

   const existed_user = await User.findOne(req.email)

   if (existed_user) 
   {
    throw new ApiErrors(409, "User already registered")
   }

   const avatar_file = req.files?.avatar[0]?.path;

   if (!avatar_file) 
    {
     throw new ApiErrors(409, "Profile Image Require")
    }

   console.log('testing',avatar_file);
  
   const avatar= await uploadonCloudinary(avatar_file)

    // console.log(avatar);
    
   const user =await User.create({
    fullname,
    email,
    avatar:avatar.url,
    password,
    username,
    })

   const created_user = await User.findById(user._id).select("-password -refreshToken")
    
   if (!created_user) 
   {
    throw new ApiErrors(500, "Something went wrong while registring the user")
   }
   else
   {
    return res.status(201).json(
      new ApiResponse(200, created_user, "user registered successfully" )
   )
   }


    
})



export {registerUser}