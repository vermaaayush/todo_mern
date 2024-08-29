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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='signup' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
        <RouterProvider router={router} />
       
  </StrictMode>,
)
