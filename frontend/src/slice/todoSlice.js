import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todo:[],
    loading:false,
    error:null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        setTodo: (state,action) =>{
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo._id === action.payload._id);
            if (index !== -1) {
              state.todos[index] = action.payload;
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
        },
    }
});


export const { setTodo, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
