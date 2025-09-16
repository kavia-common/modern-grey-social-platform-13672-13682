import React from 'react';

// PUBLIC_INTERFACE
export default function Bookmarks() {
  /** Bookmarks page placeholder with greyscale skeleton UI. */
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 800 }}>Bookmarks</h2>
      <div style={{ color: '#a7a7a7', marginTop: 8 }}>
        Save tweets for later and they will show up here.
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ color: '#a7a7a7' }}>No bookmarks yet.</div>
      </div>
    </div>
  );
}
