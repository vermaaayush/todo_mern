import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Register = () => {
  const [Input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: null,
  })

  const change = (e) =>{
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setInput({ ...Input, [name]: files[0] }); // Save the file object
    } else {
      setInput({ ...Input, [name]: value });
    }
  } 

  const submit = async (e) =>
  {
    e.preventDefault();
    // tha content multipart is needed when we use files
    try {
      const response = await axios.post("http://localhost:3000/users/register", Input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response.data);
      //shwoing notification
      toast.success("Congratulation, You are registered successfully!");
      // Clear the form after successful registration
      setInput({
        fullname: "",
        email: "",
        password: "",
        avatar: null,
      });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // This is where you handle the 409 Conflict error
       
        toast.warning("User already registered. Please use a different email.");

      } else {
        console.error("An unexpected error occurred", err);
        alert("An unexpected error occurred. Please try again.");
      }
    }
 
  }



  return (


<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

  
    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Create your account now</p>

      <div>
       <div className="relative">
          <input
            type="text"
            name='fullname'
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Full Name"
            onChange={change}
            value={Input.fullname}
          /> 
        </div>
      </div>

      <div>
       <div className="relative">
          <input
            type="email"
            name='email'
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            onChange={change}
            value={Input.email}
          /> 
        </div>
      </div>

      <div>
       <div className="relative">
          <input
            type="text"
            name='password'
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Password"
            onChange={change}
            value={Input.password}
          /> 
        </div>
      </div>

      <div>
       <div className="relative">
          <span>Profile Image</span>
          <input
            type="file"
            name='avatar'
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder=""
            onChange={change}
          /> 
        </div>
      </div>

      

     

      <button
        type="submit"
        onClick={submit}  className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign up
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <Link className="underline" to="/login"  >Login</Link>
      </p>
    </form>
   
        <ToastContainer />
  </div>
</div>


  )
}

export default Register
