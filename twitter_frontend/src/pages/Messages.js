import React from 'react';

// PUBLIC_INTERFACE
export default function Messages() {
  /** Messages page placeholder with greyscale skeleton UI. */
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 800 }}>Messages</h2>
      <div style={{ color: '#a7a7a7', marginTop: 8 }}>
        Direct messages will appear here. Start a conversation soon.
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-title">Inbox</div>
        <div style={{ color: '#a7a7a7' }}>No messages yet.</div>
      </div>
    </div>
  );
}
