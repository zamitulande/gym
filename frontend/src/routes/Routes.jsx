import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Dartboard from '../components/Dartboard'

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "dartboard",
      element: <Dartboard/>
    }
  ])
  return <RouterProvider router={router} />
}

export default Routes