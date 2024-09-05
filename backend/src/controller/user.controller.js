import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/ApiErrors.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudnary.js"
import jwt from "jsonwebtoken"

//refresh and access token generation function 

const generateAccessAndRefreshTokens = async (user_id) =>{

    try {
     
      
      const user = await User.findById(user_id)
   
      
      const  Access_t =  user.generateAccessToken()
      const  Refresh_t = user.generateRefreshToken()
      
      user.refreshToken=Refresh_t
      await user.save({validateBeforeSave: false})

          
      return {Access_t,Refresh_t}
      
    } catch (error) {
      throw new ApiErrors(500,"Issue in generating tokens!",error)
    }

}



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
    console.log("Received fields:", { fullname, email, password });
    if (!fullname || !email || !password ) {
      throw new ApiErrors(400, "All fields are required");
    }
  
    
   const existed_user = await User.findOne({email})
 
   
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
   const  generateRandomUsername = () => `User${Math.random().toString(36).substr(2, 8)}`;
    
    
   const user =await User.create({
    fullname,
    email,
    avatar:avatar.url,
    password,
    username:generateRandomUsername(),
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

const loginUser = asyncHandler ( async (req,res)=>{
         // get data from postman
         // check empty data
         // find the user in the db 
         // check password 
         // access token and refresh token generate
         // send tokens in cookies

         const {email, password} = req.body
         console.log("Received fields:", {  email, password });

        if (!email || !password ) {
          throw new ApiErrors(400, "Email or Password is required");
        }
 
        const user = await User.findOne({email})
        console.log(user);
        
        
        if (!user ) {
          throw new ApiErrors(401, "User Not Found!");
        }

        const validate_password = await user.isPasswordCorrect(password)
        console.log(validate_password);
        
        if (!validate_password ) {
          throw new ApiErrors(402, "Incorrect Password!");
        }

        const {Access_t, Refresh_t} = await generateAccessAndRefreshTokens(user._id.toString())

        const user_logged_in = await User.findById(user._id).select("-password -refreshToken")
        
        const options = {
          httpOnly: true,            // Prevent access via JavaScript
          secure: true,              // Only send over HTTPS
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000,          // Allow cross-site cookie
        };
           
        return res.status(200)
        .cookie("accesstoken",Access_t,options)
        .cookie("refreshtoken",Refresh_t,options)
        .json(
          new ApiResponse(
            200,
            {
              user: user_logged_in,Access_t,Refresh_t
            },
            "User logged in successfully!"
          )
        )
       
        
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined }
    },
    {
      new: true
    }
  );

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(new ApiResponse(200, {}, "User logged out successfully!"));
    }
  });
});

const currect_user = asyncHandler ( async (req, res)=>{
    
        return res
       .status(200)
       .json(new ApiResponse(200, req.user, "Current user fetched successfully!"))
        

      

})

const refreshAccessToken = asyncHandler ( async (req, res)=>{
   const in_ref_token = req.cookies.refreshtoken

   if (!in_ref_token) {
    throw new ApiErrors(400, "Unauthorised request");
   }

   try {
     const decoded_token  = jwt.verify(in_ref_token, process.env.REFRESH_TOKEN_SECRET)
       
       
      const user = await User.findById(decoded_token?._id)
     

      if (!user) {
        throw new ApiErrors(400, "Invalid Refresh token");
      }

      if (in_ref_token !== user?.refreshToken) {
        throw new ApiErrors(400, "Refresh token is expired or used");
      }
      
      const options = {
        httpOnly: true,            // Prevent access via JavaScript
        secure: true,              // Only send over HTTPS
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000           // Allow cross-site cookie
      };

     const {Access_t, n_Refresh_t} = await generateAccessAndRefreshTokens(user._id)


     return res.status(200)
     .cookie("access_token",Access_t,options)
     .cookie("refreshtoken",n_Refresh_t,options)
     .json(
        new ApiResponse(
           200,
           {Access_t,n_Refresh_t},
           "Access token refreshed successfully"
        )
     )
   } catch (error) {
    throw error
   }
})

const update_password = asyncHandler ( async (req, res)=>{
      const {old_pass, new_pass} =req.body

      console.log("Received fields:", {  old_pass, new_pass });
        
      const user = await User.findById(req.user?._id)
      
    
      const check_pass = await user.isPasswordCorrect(old_pass)

      if (!check_pass) {
        throw new ApiErrors(400, "Invalid Old Passord");
      }

      user.password = new_pass
      await user.save({validateBeforeSave:false})

     
      return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password Changed Successfully"))
})

const profile_update = asyncHandler ( async (req,res)=>{
  const {fullname} =req.body

  const avatarlocalpath = req.files?.path
  
  if (!avatarlocalpath) {
    throw new ApiErrors(400,"Avatar files are missing")
  }
  
  console.log("Received fields:", {  fullname });

  const user = await User.findById(req.user?._id)
  user.fullname = fullname
  await user.save({validateBeforeSave:false})

  
  const avatar = await uploadonCloudinary(avatarlocalpath)
  if (!avatar.url) {
    throw new ApiErrors(400,"API error while uploading avatar")
 }
  const user2 = await User.AndUpdate(req.user?._id,
    {
       $set:{
          avatart: avatar.url,
          
       }
    },
    {new: true}
 ).select("-password")
  
 return res
   .status(200)
   .json(200,user,"Account Details Updated")
})

export {registerUser, loginUser, logoutUser, currect_user, refreshAccessToken, update_password, profile_update}