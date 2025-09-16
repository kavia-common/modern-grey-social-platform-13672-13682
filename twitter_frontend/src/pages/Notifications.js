import React from 'react';

// PUBLIC_INTERFACE
export default function Notifications() {
  /** Notifications page placeholder with greyscale skeleton UI. */
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 800 }}>Notifications</h2>
      <div style={{ color: '#a7a7a7', marginTop: 8 }}>
        You have no new notifications. This area will show likes, replies, and follows.
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-title">Recent Activity</div>
        <div style={{ color: '#a7a7a7' }}>No activity yet.</div>
      </div>
    </div>
  );
}
