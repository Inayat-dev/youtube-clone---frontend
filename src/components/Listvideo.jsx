import React from 'react'

export default function() {
    function formatDuration(seconds = 0) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    }

  return (
    <div className='list-video'>
        <div className="videoThumbnail" style={{backgroundImage:"url()"}}>
          <span>{formatDuration(3234)}</span>
        </div>
        <div className='info-vid'>
            <div className='title-vid'>
                Getting Started with Express.js
            </div>
            <div className='channel-name'>
                Express Learner
            </div>
            <div className='vid-info'>
                11.k Views · 5 hours ago
            </div>
        </div>
    </div>
  )
}
