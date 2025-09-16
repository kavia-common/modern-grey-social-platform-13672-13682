import React from 'react';

// PUBLIC_INTERFACE
export default function Explore() {
  /** Explore page placeholder with greyscale skeleton UI. */
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 800 }}>Explore</h2>
      <div style={{ color: '#a7a7a7', marginTop: 8 }}>
        Discover trending topics and curated tweets. Coming soon.
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-title">Trending</div>
        {['#Monochrome', '#GreyscaleUI', '#DarkMode'].map((t) => (
          <div key={t} style={{ padding: '8px 0', color: '#a7a7a7' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}
