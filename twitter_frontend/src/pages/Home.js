import React, { useEffect, useRef, useState } from 'react';
import Composer from '../components/Composer';
import TweetCard from '../components/TweetCard';
import { fetchTimeline, createTweet, likeTweet } from '../services/api';
import { useFeedSocket } from '../services/ws';

// Seed fallback data in case backend not reachable
const seedTweets = [
  { id: '1', author: 'Alex', handle: 'alex', content: 'Welcome to greytweet 👋', created_at: Date.now() - 20000, likes: 3, comments: 1, liked: false },
  { id: '2', author: 'Sam', handle: 'sam', content: 'All greys, all the time.', created_at: Date.now() - 120000, likes: 1, comments: 0, liked: false },
];

// PUBLIC_INTERFACE
export default function Home() {
  /** Home feed page with composer, feed list, and infinite-scroll stub. */
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const onceRef = useRef(false);

  // Initialize WS hook at top level to satisfy Rules of Hooks
  const feedSocket = useFeedSocket((evt) => {
    if (evt?.type === 'tweet_created' && evt?.tweet) {
      setTweets(prev => [evt.tweet, ...prev]);
    } else if (evt?.type === 'tweet_liked' && evt?.tweet_id) {
      setTweets(prev => prev.map(t => t.id === evt.tweet_id ? { ...t, likes: (t.likes || 0) + 1, liked: true } : t));
    }
  });

  // Load timeline
  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTimeline({ limit: 20, offset: 0 });
        setTweets(Array.isArray(data) ? data : (data?.items || []));
      } catch {
        setTweets(seedTweets);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Manage socket lifecycle
  useEffect(() => {
    if (!feedSocket) return;
    feedSocket.connect?.();
    return () => feedSocket.disconnect?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(content) {
    try {
      const created = await createTweet({ content });
      setTweets(prev => [created, ...prev]);
    } catch {
      // optimistic fallback
      const optimistic = {
        id: String(Date.now()),
        author: 'You',
        handle: 'me',
        content,
        created_at: Date.now(),
        likes: 0,
        comments: 0,
        liked: false
      };
      setTweets(prev => [optimistic, ...prev]);
    }
  }

  async function handleLike(id) {
    try {
      await likeTweet(id);
      setTweets(prev => prev.map(t => t.id === id ? { ...t, liked: !t.liked, likes: (t.likes || 0) + (t.liked ? -1 : 1) } : t));
    } catch {
      // fallback toggle
      setTweets(prev => prev.map(t => t.id === id ? { ...t, liked: !t.liked, likes: (t.likes || 0) + (t.liked ? -1 : 1) } : t));
    }
  }

  return (
    <div>
      <Composer onSubmit={handleCreate} />
      {loading && <div style={{ padding: 16, color: '#a7a7a7' }}>Loading…</div>}
      {!loading && tweets.length === 0 && (
        <div style={{ padding: 16, color: '#a7a7a7' }}>No tweets yet. Be the first to post.</div>
      )}
      {tweets.map(t => (
        <TweetCard key={t.id} tweet={t} onLike={handleLike} onComment={() => {}} />
      ))}
    </div>
  );
}
