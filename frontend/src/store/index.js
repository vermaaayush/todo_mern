import {createSlice, configureStore} from "@reduxjs/toolkit"
const authSlice = createSlice ({
    name: "",
    initialState: {user:"", isloggedIn: false},
    reducers: {},
});


export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
});