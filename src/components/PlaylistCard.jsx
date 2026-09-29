import React from "react";
import "../assets/css/PlaylistCard.css";
import { NavLink } from "react-router-dom";

const timeAgo = (date) => {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units = [
    ["y", 31536000],
    ["mo", 2592000],
    ["w", 604800],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];
  for (const [label, secs] of units) {
    const n = Math.floor(s / secs);
    if (n >= 1) return `${n}${label} ago`;
  }
  return "just now";
};

const formatDuration = (total = 0) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = Math.floor(total % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
};

const PlaylistCard = ({ playlist }) => {
  const { name, description, videos = [], updatedAt } = playlist;

  const count = videos.length;
  const cover = videos[0]?.thumbnail;
  const totalSeconds = videos.reduce((sum, v) => sum + (v.duration || 0), 0);

  return (
    <article className="pl-card">
      <NavLink
        type="button"
        className="pl-card__media"
        to={"/Playlist/"+playlist._id}
        aria-label={`Open playlist ${name}, ${count} ${count === 1 ? "video" : "videos"}`}
      >
        {cover ? (
          <img className="pl-card__img" src={cover} alt="" loading="lazy" />
        ) : (
          <div className="pl-card__empty">No videos yet</div>
        )}

        <div className="pl-card__overlay">
          <h3 className="pl-card__title">{name}</h3>

          <div className="pl-card__meta">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M4 6h12M4 11h12M4 16h7M18 13v7l5-3.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              {count} {count === 1 ? "video" : "videos"}
            </span>
            {count > 0 && (
              <>
                <span className="pl-card__dot" />
                <span>{formatDuration(totalSeconds)}</span>
              </>
            )}
          </div>

          {/* hover pe niche se upar aata hai */}
          <div className="pl-card__descWrap">
            <p className="pl-card__desc">
              {description || "No description added."}
            </p>
          </div>
        </div>
      </NavLink>

      <div className="pl-card__footer">
        <span>Updated {timeAgo(updatedAt)}</span>
        <span className="pl-card__view">View full playlist</span>
      </div>
    </article>
  );
};

export default PlaylistCard;