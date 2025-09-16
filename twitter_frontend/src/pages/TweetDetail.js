import React from 'react';
import { useParams } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function TweetDetail() {
  /** Tweet detail page placeholder with greyscale skeleton UI. */
  const { id } = useParams();

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontWeight: 800 }}>Tweet</h2>
      <div style={{ color: '#a7a7a7', marginTop: 8 }}>
        Tweet detail view for ID: <span style={{ color: '#e6e6e6' }}>{id}</span>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ height: 14, background: '#1d1d1f', borderRadius: 6, marginBottom: 8 }} />
        <div style={{ height: 14, width: '80%', background: '#1d1d1f', borderRadius: 6 }} />
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-title">Replies</div>
        <div style={{ color: '#a7a7a7' }}>No replies yet.</div>
      </div>
    </div>
  );
}
