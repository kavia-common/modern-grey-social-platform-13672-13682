const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY || 'tw_token';

/**
 * INTERNAL: get stored auth token.
 */
function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * INTERNAL: set stored auth token.
 */
function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

/**
 * INTERNAL: Build headers including Authorization if present.
 */
function headers(extra = {}) {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra
  };
}

/**
 * INTERNAL: Handle HTTP response consistently.
 */
async function handle(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message = (data && (data.message || data.detail)) || res.statusText;
    throw new Error(message);
  }
  return data;
}

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  /** Store auth token returned by backend after login/register. */
  setToken(token);
}

// PUBLIC_INTERFACE
export function clearAuthToken() {
  /** Clear stored auth token (logout). */
  setToken(null);
}

// PUBLIC_INTERFACE
export async function fetchTimeline(params = {}) {
  /** Fetch timeline (home feed).
   * Params: { offset?: number, limit?: number }
   */
  const searchParams = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/api/tweets${searchParams ? `?${searchParams}` : ''}`, {
    method: 'GET',
    headers: headers()
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function createTweet(payload) {
  /** Create a new tweet.
   * payload: { content: string }
   */
  const res = await fetch(`${BASE_URL}/api/tweets`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function likeTweet(tweetId) {
  /** Toggle like for a tweet. */
  const res = await fetch(`${BASE_URL}/api/tweets/${tweetId}/like`, {
    method: 'POST',
    headers: headers(),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function commentOnTweet(tweetId, payload) {
  /** Comment on a tweet.
   * payload: { content: string }
   */
  const res = await fetch(`${BASE_URL}/api/tweets/${tweetId}/comments`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function getProfile(handle) {
  /** Get a user profile and their tweets. */
  const res = await fetch(`${BASE_URL}/api/users/${encodeURIComponent(handle)}`, {
    method: 'GET',
    headers: headers(),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function getUserTweets(handle, params = {}) {
  /** Get tweets by a specific user. */
  const searchParams = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/api/users/${encodeURIComponent(handle)}/tweets${searchParams ? `?${searchParams}` : ''}`, {
    method: 'GET',
    headers: headers(),
  });
  return handle(res);
}

// PUBLIC_INTERFACE
export async function login(payload) {
  /** Login and receive token.
   * payload: { username: string, password: string }
   */
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  const data = await handle(res);
  if (data?.token) setAuthToken(data.token);
  return data;
}

// PUBLIC_INTERFACE
export async function register(payload) {
  /** Register a new user and possibly receive token.
   * payload: { username: string, password: string, display_name?: string }
   */
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  const data = await handle(res);
  if (data?.token) setAuthToken(data.token);
  return data;
}

// PUBLIC_INTERFACE
export function isAuthenticated() {
  /** Return boolean if token exists. */
  return !!getToken();
}

// PUBLIC_INTERFACE
export function getAuthToken() {
  /** Retrieve current auth token. */
  return getToken();
}
