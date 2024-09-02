import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import './index.css'
import About from './components/About/About.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import TodoView from './components/Todo/TodoView.jsx'
import store, { persistor } from './store/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AddTodo from './components/Todo/AddTodo.jsx'
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import Profile from './components/Profile/Profile.jsx'

const PrivateRoute = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='signup' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='view-todo/:id' element={<TodoView/>}/>
      <Route element={<PrivateRoute />}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='profile' element={<Profile/>}/>
          
          <Route path='add-todo' element={<AddTodo/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        </PersistGate> 
      </Provider> 
  </StrictMode>,
)
