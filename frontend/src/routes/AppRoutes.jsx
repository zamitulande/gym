import React from 'react'
import { Route, Routes, createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import PrivateRoute from './PrivateRoute'

const AppRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Ruta protegida */}
      <PrivateRoute path="/dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated} />
    </Routes>
  );
}

export default AppRoutes