import React from 'react';

// PUBLIC_INTERFACE
export default function RightRail() {
  /** Right rail with suggestions and placeholder trends in greyscale. */
  return (
    <div>
      <div className="card">
        <div className="card-title">Who to follow</div>
        {[ 'alex', 'sam', 'jordan' ].map(u => (
          <div className="suggestion" key={u}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar" />
              <div>
                <div style={{ fontWeight: 700 }}>{u}</div>
                <div style={{ color: '#a7a7a7', fontSize: 13 }}>@{u}</div>
              </div>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Trends</div>
        {[ 'GreyscaleUI', 'DarkMode', 'Monochrome' ].map(t => (
          <div key={t} style={{ padding: '8px 0', color: '#a7a7a7' }}>#{t}</div>
        ))}
      </div>
    </div>
  );
}
