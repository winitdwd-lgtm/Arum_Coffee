import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import CustomCursor from './CustomCursor';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container min-h-screen bg-[#080604] text-white">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}