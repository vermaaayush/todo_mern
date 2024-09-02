import React from 'react'
import { useState,useEffect, useRef } from 'react'
import TodoCard from '../Todo/TodoCard';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTodo } from '../../slice/todoSlice';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);

    const todos = useSelector(state => state.todos.todos);

    const toastShownRef = useRef(false); 
   
    // useEffect(() => {
    //   console.log(user); // This will log the updated user state when it changes
    // }, [user]);
   
  useEffect(() => {
    
    const fetchTodos = async () =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/todo/allTodo`,{
                withCredentials: true,
            });
            
            dispatch(setTodo(response.data.data));
            
            if (!toastShownRef.current && user.user?.fullname) {
              toast.success("Welcome, " + user.user.fullname);
              toastShownRef.current = true; // Mark toast as shown
            }
          
            
        } catch (err) {
            if (err.response && err.response.status === 404) {
                 
                toast.warning("No todos found!");

            }
            else
            {
                console.log(err);

            }
           
            
        }
       
        
    };
   
      fetchTodos();
  
  }, []);

  // if (loading) return <p>Loading...</p>;

  return (
    <>
        <ToastContainer />
        <div className="container mx-auto p-20">
        <h1>Welcome, {user.user.fullname}</h1>
        <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-semibold">Recent Documents</h1>

  <Link to="/add-todo" className="px-4 py-2 bg-orange-600 text-white rounded">Add New Doc</Link>
</div>



  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {Array.isArray(todos) && todos.length > 0 ?  (
            todos.map(todoItem => (
              <TodoCard key={todoItem._id} todo={todoItem} />
            ))
          ) : (
            <p>No todos available.</p>
          )}
      </div>
</div>

    </>
    
  )
}

export default Dashboard
