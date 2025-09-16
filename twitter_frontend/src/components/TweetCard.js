import React from 'react';

// PUBLIC_INTERFACE
export default function TweetCard({ tweet, onLike, onComment }) {
  /** Render a tweet card with metadata and actions in greyscale. */
  const { id, author, handle, content, created_at, liked, likes = 0, comments = 0 } = tweet;

  return (
    <article className="tweet">
      <div className="avatar" />
      <div>
        <div className="tweet-header">
          <span className="tweet-author">{author || 'User'}</span>
          <span className="tweet-handle">@{handle || 'handle'}</span>
          <span className="tweet-time">· {new Date(created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="tweet-content">{content}</div>
        <div className="tweet-actions">
          <button className={`tweet-action like ${liked ? 'active' : ''}`} onClick={() => onLike?.(id)}>
            <span aria-hidden>♡</span>
            <span>{likes}</span>
          </button>
          <button className="tweet-action" onClick={() => onComment?.(id)}>
            <span aria-hidden>💬</span>
            <span>{comments}</span>
          </button>
          <div className="tweet-action">
            <span aria-hidden>↗</span>
            <span>Share</span>
          </div>
        </div>
      </div>
    </article>
  );
}
