import React, { useState } from "react";
import "../assets/css/TweetCard.css";
import { Api } from "../api/Api";

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

const fullDate = (date) =>
  new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const TweetCard = ({ tweet, user = {}, onLike, onShare }) => {
  const { content, createdAt, updatedAt } = tweet;
  const { name = "Unknown", username = "unknown", avatar } = user;

  const [liked, setLiked] = useState(tweet.isLiked);
  const isEdited =
    new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 1000;

  const handleLike = async (e) => {
    e.stopPropagation();
    const res = await Api.post("like/toggle/t/"+tweet._id)
    console.log(res);
    setLiked((v) => !v);
    onLike?.(tweet, !liked);
  };


  return (
    <article className="tw-card">
      <header className="tw-card__head">
        {avatar ? (
          <img className="tw-card__avatar" src={avatar} alt="" />
        ) : (
          <div className="tw-card__avatar tw-card__avatar--fallback">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="tw-card__who">
          <strong className="tw-card__name">{name}</strong>
          <span className="tw-card__handle">@{username}</span>
        </div>

        <time
          className="tw-card__time"
          dateTime={createdAt}
          title={fullDate(createdAt)}
        >
          {timeAgo(createdAt)}
        </time>
      </header>

      <p className="tw-card__content">{content}</p>

      {isEdited && (
        <span className="tw-card__edited" title={fullDate(updatedAt)}>
          Edited {timeAgo(updatedAt)}
        </span>
      )}

      {/* actions slide up on hover */}
      <footer className="tw-card__actionsWrap">
        <div className="tw-card__actions">
          <button
            type="button"
            className={`tw-card__btn tw-card__btn--like ${liked ? "is-liked" : ""}`}
            onClick={handleLike}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.4-9.3 9-9.3 9z"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span>{liked ? "Liked" : "Like"}</span>
          </button>

          <button
            type="button"
            className="tw-card__btn"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard?.writeText(content);
              onShare?.(tweet);
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Copy</span>
          </button>
        </div>
      </footer>
    </article>
  );
};

export default TweetCard;