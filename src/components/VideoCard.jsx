import { Link } from "react-router-dom";
import "../assets/css/Videocard.css";

function formatDuration(seconds = 0) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function view(v) {
  let count = String(v).length
  if (count <= 4) {
    return v
  } else if (count == 5) {
    return String(v)[0] + String(v)[1] + "K"
  } else if (count == 6) {
    return String(v)[0] + String(v)[1] + String(v)[2] + "K"
  } else if (count == 7) {
    return String(v)[0] + "." + String(v)[1] + "M"
  } else if (count == 8) {
    return String(v)[0] + String(v)[1] + "M"
  } else if (count == 9) {
    return String(v)[0] + String(v)[1] + String(v)[2] + "M"
  } else if (count == 10) {
    return String(v)[0] + "." + String(v)[1] + "B"
  } else if (count == 11) {
    return String(v)[0] + String(v)[1] + "B"
  } else if (count == 12) {
    return String(v)[0] + String(v)[1] + String(v)[2] + "B"
  } else {
    return String(v)   
  }
}

function timeAgo(date) {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function VideoCard({ video, current }) {
  const { _id, thumbnail, title, duration, views, createdAt, owner } = video;

  const ownerName = owner[0]?.username || owner[0]?.fullName || "Unknown creator";
  const ownerAvatar = owner[0]?.avatar;
  if(current == "home")
    return (
      <Link to={"/video/"+_id} className="videoCardLink">
        <div className="VideoCard" style={{textDecoration:" none !important"}} >
          <div className="videoThumbnail" style={{backgroundImage:"url("+thumbnail+")"}}>
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="details">
              <div className="img">
                <img src={''+ownerAvatar} alt="logo" />
              </div>
              <div>
                <p>{title}</p>
                <p>{ownerName}</p>
                <p>{view(views)} • {timeAgo(createdAt)}</p>
              </div>
          </div>
        </div>
      </Link>
    );

  if(current == "video")
  return (
    <Link to={"/video/"+_id} className="videoCardLink">
      <div className='vd-list-item' key={_id}>
        <div className="vd-list-thumbnail" style={{ backgroundImage: `url(${thumbnail})` }}>
          <span>{formatDuration(duration)}</span>
        </div>
        <div className='vd-list-info'>
          <div className='vd-list-title'>{title}</div>
          <div className='vd-list-channel'>{owner[0].username}</div>
          <div className='vd-list-meta'>{views} Views · {timeAgo(createdAt)}</div>
        </div>
      </div>
    </Link>
  );
}