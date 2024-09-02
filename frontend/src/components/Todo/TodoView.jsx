import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';




const TodoView = () => {

  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);


  const handleShare = () =>{
    const currentUrl = window.location.href; // Get the current page URL

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast.success('Document URL Copied!');
      })
      .catch(() => {
        toast.error('Failed to copy URL.');
      });
  };

  const pdfdownload = () =>{
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(20);
    doc.text(todo.title, 10, 20);
  
    // Strip HTML tags from the description
    const plainTextDescription = todo.description.replace(/<\/?[^>]+(>|$)/g, "");
  
    // Add plain text content
    doc.setFontSize(12);
    doc.text(plainTextDescription, 10, 30);
  
    // Save the PDF
    doc.save(`${todo.title}.pdf`);
  
  }
  
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todo/view_todo/${id}`,{
            withCredentials: true,
        });
       
        
        setTodo(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch the Todo' + error);
        setLoading(false);
      }

      
    };

    fetchTodo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
   <>
   <ToastContainer />
   <br />

   {isAuthenticated && (<Link to="/dashboard" className="mt-4 px-4 py-2 ml-6 bg-orange-600 text-white rounded">Back To Dashboard</Link>)}
     <br />
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{todo.title}</h1>
      <ReactQuill
        value={todo.description}
        onChange={(content) => setTodo({ ...todo, description: content })}
        style={{ height: '350px', }}
      />

      <br />
      <br />
      {isAuthenticated && (
      <>
      <button
        onClick={async () => {
          try {
            await axios.post(`http://localhost:3000/todo/updateTodo/${id}`, todo,{
              withCredentials: true,
            }); // Update the Todo
         
            toast.success("Todo updated successfully!");
          } catch (err) {
            console.log(err);
            
         
            toast.warning("Failed to update Todo");
          }
        }}
        className="mt-4 px-4 py-2 mx-4 bg-green-700 text-white rounded"
      >
        Update Now
      </button>


      <button  className="mt-4 px-4 py-2 mx-4 bg-blue-700 text-white rounded"   onClick={handleShare}>Share</button>

      <button onClick={ async () =>{
         try {

          await axios.delete(`http://localhost:3000/todo/deleteTodo/${id}`, todo);
                
         
          navigate('/dashboard', { replace: true });


         } catch (error) {
          
          toast.warning("Failed to delete Todo");

         }
      }}
      
      
      className="mt-4 px-4 py-2 mx-4 bg-red-700 text-white rounded">Delete</button>


     <button  className="mt-4 px-4 py-2 mx-4 bg-yellow-700 text-white rounded"   onClick={pdfdownload}>Download as PDF</button>
     </>
     )}
    </div>
   
         
   </>
  )
}

export default TodoView
