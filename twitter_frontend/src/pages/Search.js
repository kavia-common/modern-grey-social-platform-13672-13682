import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Search() {
  /** Search page placeholder with greyscale skeleton UI. */
  const [q, setQ] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    // TODO: wire to backend search
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 800 }}>Search</h2>
      <form onSubmit={onSubmit} style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <input className="searchbar" placeholder="Search tweets and users" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn">Search</button>
      </form>
      <div style={{ color: '#a7a7a7', marginTop: 12 }}>
        Results will appear here.
      </div>
    </div>
  );
}
