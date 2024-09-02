import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const [input, setInput] = useState({
    title: "",
  });
  
  const [description, setDescription] = useState(''); // Separate state for ReactQuill content
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value); // Update state with ReactQuill content
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Merge the description from ReactQuill with other form data
      const todoData = {
        ...input,
        description,
      };

      // Replace with your API endpoint
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/todo/createTodo`, todoData, {
        withCredentials: true,
      });
    
      toast.success('Document added successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); 

    } catch (error) {
      toast.error('Failed to add Document.');
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add New Todo</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={input.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter the title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Content</label>
            <ReactQuill
              value={description} // Use the description state
              onChange={handleDescriptionChange} // Handle change with a separate handler
              style={{ height: '200px' }}
              className="bg-white"
            />
          </div> 

          <br />
          <br />
          <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded">
            Add Todo
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTodo;
