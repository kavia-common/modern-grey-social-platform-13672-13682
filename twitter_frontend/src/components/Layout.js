import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import LeftNav from './LeftNav';
import RightRail from './RightRail';

// PUBLIC_INTERFACE
export default function Layout() {
  /** Layout shell with left nav, feed outlet, and right rail. */
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  function onSearchSubmit(e) {
    e.preventDefault();
    navigate('/search' + (q ? `?q=${encodeURIComponent(q)}` : ''));
  }

  return (
    <div className="app-shell">
      <aside className="left-rail">
        <div className="brand">greytweet</div>
        <LeftNav />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <NavLink to="/explore" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="icon" aria-hidden>⬤</span>
            <span className="nav-label">Explore</span>
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="icon" aria-hidden>⬤</span>
            <span className="nav-label">Notifications</span>
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="icon" aria-hidden>⬤</span>
            <span className="nav-label">Messages</span>
          </NavLink>
          <NavLink to="/bookmarks" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="icon" aria-hidden>⬤</span>
            <span className="nav-label">Bookmarks</span>
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="icon" aria-hidden>⬤</span>
            <span className="nav-label">Search</span>
          </NavLink>
        </nav>
        <button className="compose-btn" onClick={() => navigate('/')}>Compose</button>
      </aside>

      <main className="feed">
        <div className="feed-header">
          <form onSubmit={onSearchSubmit} style={{ display: 'flex', gap: 8, flex: 1 }}>
            <input className="searchbar" placeholder="Search greytweet" value={q} onChange={(e) => setQ(e.target.value)} />
            <button className="btn" type="submit">Go</button>
          </form>
          <NavLink to="/auth" className="btn">Sign in</NavLink>
        </div>
        <Outlet />
      </main>

      <aside className="right-rail">
        <RightRail />
      </aside>
    </div>
  );
}
