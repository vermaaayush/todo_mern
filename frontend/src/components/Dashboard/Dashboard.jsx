import React from 'react'
import { useState,useEffect } from 'react'
import TodoCard from '../Todo/TodoCard';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  useEffect(() => {
    
    const fetchTodos = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/todo/allTodo",{
                withCredentials: true,
            });
            setTodos(response.data.data);
            console.log(response.data.data);
          
            
        } catch (err) {
            if (err.response && err.response.status === 404) {
                 
                toast.warning("No todos found!");

            }
            else
            {
                console.log(err);
                alert('Error Occur');
            }
           
            
        }
        finally {
            setLoading(false);
          }
        
    };
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
        <ToastContainer />
        <div className="container mx-auto p-20">
  <h1 className="text-2xl font-semibold mb-4">Recent Documents</h1>
  {todos.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} />
      ))}
    </div>
  ) : (
    <p>No TODOs found</p>
  )}
</div>

    </>
    
  )
}

export default Dashboard
