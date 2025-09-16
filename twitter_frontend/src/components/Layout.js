import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import LeftNav from './LeftNav';
import RightRail from './RightRail';

// PUBLIC_INTERFACE
export default function Layout() {
  /** Layout shell with left nav, feed outlet, and right rail. */
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <aside className="left-rail">
        <div className="brand">greytweet</div>
        <LeftNav />
        <button className="compose-btn" onClick={() => navigate('/')}>Compose</button>
      </aside>

      <main className="feed">
        <div className="feed-header">
          <input className="searchbar" placeholder="Search greytweet" />
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
