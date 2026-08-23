# YouTube Clone — Frontend

[![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=white)](https://react.dev/)

A React frontend for the [YouTube Clone backend](https://github.com/Inayat-dev/youtube-clone) — a full YouTube-style UI for browsing videos, authentication, uploading, playlists, subscriptions, comments, likes, and community posts, powered by a custom Node.js/Express/MongoDB REST API.

> This project is in early development. This README covers the planned structure and setup — update it as the actual pages/components take shape.

## Features (planned)

- **Auth** — Login/Register pages, JWT-based session (access + refresh tokens via httpOnly cookies)
- **Home / Feed** — Browse all videos
- **Watch page** — Video player, description, likes, comments
- **Upload** — Upload video + thumbnail, edit/delete own videos, toggle publish status
- **Playlists** — Create, edit, delete playlists; add/remove videos
- **Subscriptions** — Subscribe/unsubscribe to channels, subscriptions feed
- **Comments & Likes** — Add/edit/delete comments, like videos/comments/tweets
- **Community Tweets** — Short community-style posts
- **Channel / Profile** — View channel, edit profile, avatar & cover image upload, watch history
- **Dashboard** — Channel stats (total videos, views, likes, subscribers)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Routing | React Router |
| API calls | Axios |
| State management | Context API|
| Backend | [youtube-clone](https://github.com/Inayat-dev/youtube-clone) — Node.js, Express, MongoDB |

## Connects To (Backend API)

The backend exposes these base routes (see the [backend repo](https://github.com/Inayat-dev/youtube-clone) for full endpoint docs):

```
/users          — auth, profile, avatar/cover, watch history
/video          — upload, fetch, update, delete, publish toggle
/playlist       — create, update, delete, add/remove videos
/subscription   — subscribe/unsubscribe, subscriber & subscription lists
/comment        — add, update, delete, fetch
/like           — like/unlike videos, comments, tweets
/tweet          — create, update, delete, search
/dashboard      — channel stats
/healthcheck    — API health status
```

## Project Structure (planned)

```
youtube-clone-frontend/
├── public/
├── src/
│   ├── assets/              # Images, icons, logos
│   ├── components/          # Reusable UI (Navbar, Sidebar, VideoCard, CommentBox, etc.)
│   ├── pages/                # Route-level pages (Home, Watch, Login, Register, Channel, Upload, Playlist, Dashboard)
│   ├── context/ or store/     # Auth & global state
│   ├── api/                   # Axios instance & API call functions per resource
│   ├── hooks/                  # Custom hooks (useAuth, useFetch, etc.)
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- The [backend API](https://github.com/Inayat-dev/youtube-clone) running locally (or deployed) — this frontend needs it to function

### Installation

```bash
git clone https://github.com/Inayat-dev/youtube-clone-frontend.git
cd youtube-clone-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:4500
```

### Run the Dev Server

```bash
npm run dev
```

By default, Vite serves the app at `http://localhost:5173`.

## Author

**Inayat** ([@Inayat-dev](https://github.com/Inayat-dev))

