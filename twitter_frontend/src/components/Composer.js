import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Composer({ onSubmit, max = 280 }) {
  /** Composer for creating a tweet with character counter. */
  const [text, setText] = useState('');
  const remaining = max - text.length;
  const disabled = text.trim().length === 0 || text.length > max;

  function submit() {
    if (!disabled) {
      onSubmit(text.trim());
      setText('');
    }
  }

  return (
    <div className="composer">
      <div className="avatar" />
      <div>
        <div className="textarea-wrap">
          <textarea
            rows={3}
            placeholder="What’s happening?"
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={max + 50} // allow beyond for live counter but we disable submit
          />
        </div>
        <div className="composer-actions">
          <div className="counter">{remaining} left</div>
          <button className="btn primary" disabled={disabled} onClick={submit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
