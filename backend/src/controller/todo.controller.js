import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/ApiErrors.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js"
import {Todo} from "../models/todo.model.js"
import jwt from "jsonwebtoken"

const test = asyncHandler( async (req,res)=>{
    
   
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "HI i an working"))
  
})

const createTodo = asyncHandler( async (req,res)=>{
    
    const {title, description} =req.body
    console.log("Received fields:", {  title, description });
    
        if (!title || !description) 
        {
        throw new ApiErrors(400, "All fields are required");
        }

        try {
            const todo_entry =  await Todo.create({
                title,
                description,
                ownerId:req.user?._id
    
            })
        } catch (error) {
            throw new ApiErrors(500,"Issue in creating Todo!",error)
        }

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Todo created Successfully"))

  
})

const updateTodo = asyncHandler ( async(req, res)=>{
     const {xx} = req.params
     const todo_id = String(xx);
     const {title, description} =req.body
    //  console.log("Received fields:", {  title, description });
    //  console.log(todo_id);
     

    const fetched_db_todo = await Todo.findById(todo_id)

      if (!fetched_db_todo) {
        throw new ApiErrors(400, "Todo not found");
      }

      fetched_db_todo.title=title
      fetched_db_todo.description=description
      await fetched_db_todo.save()

      //other syntex

    //   const updatedTodo = await Todo.findByIdAndUpdate(
    //     todo_id,
    //     { title, description },
    //     { new: true, runValidators: true } // new: true returns the updated document, runValidators ensures the update is validated against the schema
    //   );

      return res
      .status(200)
      .json(new ApiResponse(200, {}, "Todo Updated Successfully"))



     //fetch todo id from url
     //fetch todo data from form
     //update query
     //response


})

const allTodo = asyncHandler ( async(req, res)=>{
    
    const all_todos = await Todo.find({ ownerId: req.user?._id, status: true });
    console.log(all_todos);
    console.log(req.user?._id);
    
    if (all_todos.length === 0) 
    {
        return res.status(404).json(new ApiResponse(404, {}, "No todos found for this user"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, all_todos, "Todos fetched successfully"));

})


const trashTodo = asyncHandler ( async(req, res)=>{
    
  const all_todos = await Todo.find({ ownerId: req.user?._id, status: false });
  console.log(all_todos);
  
  if (all_todos.length === 0) 
  {
      return res.status(404).json(new ApiResponse(404, {}, "No todos found for this user"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, all_todos, "Todos fetched successfully"));

})

const deleteTodo = asyncHandler ( async(req, res)=>{
    
    const {xx} = req.params
    const todo_id = String(xx);
    console.log(todo_id);
    
    const todoExists = await Todo.findById(todo_id);

    if (!todoExists) {
        throw new ApiErrors(400, "Todo not found");
    }
     
    todoExists.status = 'false'
    todoExists.save()
    
    
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Todos deleted successfully"));

})

const deletetrashTodo = asyncHandler ( async(req, res)=>{
    
  const {xx} = req.params
  const todo_id = String(xx);
  console.log(todo_id);
  
  const todoExists = await Todo.findById(todo_id);

  if (!todoExists) {
      throw new ApiErrors(400, "Todo not found");
  }

  
  await Todo.findByIdAndDelete(todo_id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Todos deleted successfully"));

})

const shareTodo = asyncHandler ( async(req, res)=>{
    
    const {todo_id} = req.params
    const todoId = String(todo_id);
    const {receive_userID} =req.body
    // console.log("Received fields:", { receive_userID });
    // console.log(todoId);
    
    const todoExists = await Todo.findById(todoId);

    if (!todoExists) {
        throw new ApiErrors(400, "Todo not found");
    }

    const userExists = await User.findById(receive_userID);

    if (!userExists) {
        throw new ApiErrors(400, "Invalid User Id");
    }

    const cloneTodo = await Todo.create({
        title:todoExists.title,
        description: todoExists.description,
        ownerId: receive_userID,
    })

    
   

    return res
      .status(200)
      .json(new ApiResponse(200, cloneTodo, "Todo shared successfully"));

})


const retr_todo = asyncHandler ( async(req, res)=>{
    
    const {todo_id} = req.params
    const todoId = String(todo_id);
    console.log(todoId);
    
    const todoExists = await Todo.findById(todoId);

    if (!todoExists) {
        throw new ApiErrors(400, "Todo not found");
    }

    todoExists.status = true
    todoExists.save()
    
   
    return res
      .status(200)
      .json(new ApiResponse(200, todoExists.status, "Todo retreive successfully"));

})


const view_todo = asyncHandler ( async(req, res)=>{
    
    const {todo_id} = req.params
    const todoId = String(todo_id);
 
    
    const viewtodo = await Todo.findById(todoId);

    if (!viewtodo) {
        throw new ApiErrors(400, "Todo not found");
    }
    
   
    return res
      .status(200)
      .json(new ApiResponse(200, viewtodo, "Todo retreive successfully"));
 

    
})

export {test, createTodo, updateTodo, allTodo, deleteTodo, shareTodo, trashTodo, deletetrashTodo, retr_todo, view_todo}