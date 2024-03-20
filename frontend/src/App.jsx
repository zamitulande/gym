import './App.css'
import { ThemeProvider } from '@mui/material'
import { getTheme } from './config/Theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './components/Home'
import Register from './components//user/Register'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import RegisterRoutine from './components/routine/RegisterRoutine'

function App() {

  return (
    <ThemeProvider theme={getTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route
            path='/register'
            element={
              <ProtectedRoute redirectTo='/'>
                <Register/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute redirectTo='/'>
                <Register/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/register-routine'
            element={
              <ProtectedRoute redirectTo='/'>
                <RegisterRoutine/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
