import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../slice/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userx = useSelector((state) => state.user);
     
    useEffect(() => {
      console.log(userx); // This will log the updated user state when it changes
    }, [userx]);


    const [Input, setInput] = useState({
        email: "",
        password: "",
       
      })

    const change = (e) =>
    {
    const { name, value } = e.target;
   
    setInput({ ...Input, [name]: value });
    
    } 

    const submit = async (e) =>
        {
          e.preventDefault();
          // tha content multipart is needed when we use files
          try {
            // const response = await axios.post("https://easydoc-backend.onrender.com/users/login", Input);
         
            const response = await axios.post("https://easydoc-backend.onrender.com/users/login", Input, {
              withCredentials: true,
            });

            
            
            dispatch(setUser(response.data.data.user));

            console.log(response.data.data.user);

            
            //shwoing notification
            toast.success("User Login successfull!");
           
            
            navigate("/dashboard")

          } catch (err) {
            console.log(err);
            
            if (err.response && err.response.status === 401) {
              // This is where you handle the 409 Conflict error
             
              toast.warning("User Not Found!");
      
            }
            else if (err.response && err.response.status === 402) {
                // This is where you handle the 409 Conflict error
               
                toast.warning("Incorrect Password!");
        
              }
            else {
              console.error("An unexpected error occurred", err);
              alert("An unexpected error occurred. Please try again.");
            }
          }
       
        }




  return (

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
<ToastContainer />
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-orange-600 sm:text-3xl">Get started today</h1>

   
    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
       <div className="relative">
          <input
            type="email"
            name='email'
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Email"
            onChange={change}
            value={Input.email}
          /> 
        </div>
      </div>


      <div>
       <div className="relative">
          <input
            type="password"
            name='password'
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Password"
            onChange={change}
            value={Input.password}
          /> 
        </div>
      </div>

     

      <button
        onClick={submit} 
        type="submit"
        className="block w-full rounded-lg bg-orange-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <Link className="underline" to="/signup">Sign up</Link>
      </p>
    </form>
  </div>
</div>
  )
}

export default Login
