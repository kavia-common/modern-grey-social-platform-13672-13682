import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Bookmarks from './pages/Bookmarks';
import Search from './pages/Search';
import TweetDetail from './pages/TweetDetail';

// PUBLIC_INTERFACE
function App() {
  /** Root application with routing and the main greyscale layout shell. */
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:handle" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tweet/:id" element={<TweetDetail />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
