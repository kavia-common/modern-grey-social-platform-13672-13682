import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

// PUBLIC_INTERFACE
function App() {
  /** Root application with routing and the main greyscale layout shell. */
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:handle" element={<Profile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
