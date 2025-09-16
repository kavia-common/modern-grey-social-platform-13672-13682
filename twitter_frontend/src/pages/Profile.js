import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TweetCard from '../components/TweetCard';
import { getProfile, getUserTweets } from '../services/api';

// PUBLIC_INTERFACE
export default function Profile() {
  /** Profile page showing user info and their tweets. */
  const { handle } = useParams();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const [p, t] = await Promise.all([
          getProfile(handle),
          getUserTweets(handle, { limit: 20, offset: 0 })
        ]);
        if (!ignore) {
          setProfile(p || { display_name: handle, handle });
          setTweets(Array.isArray(t) ? t : (t?.items || []));
        }
      } catch {
        if (!ignore) {
          setProfile({ display_name: handle, handle, bio: 'Monochrome enthusiast.' });
          setTweets([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [handle]);

  return (
    <div>
      <div className="profile-header">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="avatar" style={{ width: 56, height: 56 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{profile?.display_name || handle}</div>
            <div className="profile-meta">@{handle}</div>
          </div>
        </div>
        {profile?.bio && <div style={{ marginTop: 10 }}>{profile.bio}</div>}
      </div>

      {loading && <div style={{ padding: 16, color: '#a7a7a7' }}>Loading…</div>}
      {!loading && tweets.length === 0 && (
        <div style={{ padding: 16, color: '#a7a7a7' }}>No tweets yet.</div>
      )}
      {tweets.map(t => (
        <TweetCard key={t.id} tweet={t} onLike={() => {}} onComment={() => {}} />
      ))}
    </div>
  );
}
