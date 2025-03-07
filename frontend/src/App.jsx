import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';

function Logout(){
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
    localStorage.clear();
    return <Register />
}

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
