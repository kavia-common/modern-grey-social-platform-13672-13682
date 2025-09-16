# Greyscale Twitter Replica Frontend

A modern, purely greyscale React SPA that mirrors core Twitter-like functionality: timeline, posting, likes, comments (hook), profiles, and responsive layout. Designed without UI frameworks, only React + CSS.

## Features
- Pure greyscale theme: dark modern palette with subtle elevation and borders
- Timeline feed with composer
- Like action and comment hook
- Profile page with user tweets
- Responsive layout with left navigation and right suggestions rail
- REST API integration via env-configured base URL
- Optional WebSocket hook for realtime updates

## Getting Started

1) Install dependencies
   npm install

2) Configure environment variables
   - Copy .env.example to .env and set:
     REACT_APP_API_BASE_URL=http://localhost:8000
     REACT_APP_WS_URL=ws://localhost:8000/ws   (optional)
     REACT_APP_AUTH_TOKEN_KEY=tw_token

3) Start the app
   npm start

Open http://localhost:3000

## API Contract (expected)
- GET    /api/tweets?limit=&offset=           -> Array of tweets or {items: []}
- POST   /api/tweets                          -> { id, content, author, handle, created_at, ... }
- POST   /api/tweets/:id/like                 -> { success: true }
- POST   /api/tweets/:id/comments             -> { id, content, ... }
- GET    /api/users/:handle                   -> { display_name, handle, bio? }
- GET    /api/users/:handle/tweets            -> Array of tweets or {items: []}
- POST   /api/auth/login                      -> { token }
- POST   /api/auth/register                   -> { token }

The UI falls back to local seed data if the backend is unavailable.

## Code Map
- src/services/api.js       REST client and token storage
- src/services/ws.js        WebSocket helper (optional)
- src/components/*          Layout, nav, composer, tweet card, right rail
- src/pages/Home.js         Timeline with composer
- src/pages/Profile.js      User profile
- src/pages/Auth.js         Login/Register

## Styling
See src/App.css for the greyscale palette and component styles.

## Notes
- Public interfaces (functions intended for reuse) are labeled with PUBLIC_INTERFACE comments in the code.
- No configuration values are hardcoded; use .env variables.
