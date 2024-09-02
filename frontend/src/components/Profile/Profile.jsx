
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

const Profile = () => {

    const user = useSelector(state => state.user);
    
    const [Input, setInput] = useState({
        old_pass: "",
        new_pass: "",
       
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
             
                const response = await axios.post("https://easydoc-backend.onrender.com/users/update-password", Input, {
                  withCredentials: true,
                });
     
                console.log('Chalgaya');
                
                console.log(response);
                   
                //shwoing notification
                toast.success("Password Updated Successfully!");
               
    
              } catch (err) {
                console.log(err);
                
                if (err.response && err.response.status === 400) {
                  // This is where you handle the 409 Conflict error
                 
                  toast.error("Invalid Old Passord!");
          
                }
                
                else {
                    toast.error("Password Update Failed!");
                }
              }
           
            }    
    

  return (
    <>
       <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto transition-all duration-300 hover:shadow-2xl mt-20 mb-10">
      <div className="bg-orange-600 h-32"></div>
      <div className="flex flex-col items-center -mt-20 px-6 pb-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img 
            src={user.user.avatar || "/api/placeholder/160/160"} 
            alt={user.user.fullname} 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Name: {user.user.fullname}</h2>
        <div className="mt-2 flex items-center text-gray-600">
         
          <p>Email: {user.user.email}</p>
        </div>
        <div className="mt-1 flex items-center text-gray-600">
        
          <p>Username: @{user.user.username}</p>
        </div>
        
      </div>
    </div>




<ToastContainer />
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
  

    <form action="#" className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Update Your Password</p>

      <div>
        <label htmlFor="password" className="sr-only">Old Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Old Password"
            onChange={change}
            value={Input.old_pass}
            name='old_pass'
          />

         
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">New Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="New password"
            onChange={change}
            value={Input.new_pass}
            name='new_pass'
          />

          
        </div>
      </div>

      <button
        type="submit" onClick={submit} 
        className="block w-full rounded-lg bg-orange-600 px-5 py-3 text-sm font-medium text-white"
      >
       Update Password
      </button>

     
    </form>
  </div>
</div>
    </>
  )
}

export default Profile
