import React from 'react';
import { NavLink } from 'react-router-dom';

function Item({ to, label, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
    >
      <span className="icon" aria-hidden>⬤</span>
      <span className="nav-label">{label}</span>
      {children}
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function LeftNav() {
  /** Left navigation rail with primary routes. */
  return (
    <nav>
      <Item to="/" label="Home" />
      <Item to="/explore" label="Explore" />
      <Item to="/notifications" label="Notifications" />
      <Item to="/messages" label="Messages" />
      <Item to="/bookmarks" label="Bookmarks" />
      <Item to="/search" label="Search" />
      <Item to="/profile/me" label="Profile" />
    </nav>
  );
}
