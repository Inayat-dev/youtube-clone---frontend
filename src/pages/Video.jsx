import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import "../assets/css/videoDetail.css"
import { ThumbsUp, FolderPlus, UserPlus  } from 'lucide-react';

export default function Video() {
  return (
    <>
      <Header />
      <div style={{display:"flex"}}>
        <Sidebar />
        <div className='video-detail-container'>
            <div className='video-detail'>
              <div className='video'>
                <video src="https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4"></video>
              </div>
              <div className='details'>
                <div className='D-video'>
                  <div className='left'>
                    <h3>title</h3>
                    <p>30,164 Views ·18 hours ago</p>
                  </div>
                  <div className='right'>
                    <div className='like'>
                      <ThumbsUp /> <span>2330</span>
                    </div>
                    <div className='save'>
                      <button> <FolderPlus />Save</button>
                    </div>
                  </div>
                </div>
                <div className='D-channel'>
                  <div className='left'>
                    <div className='logo'>
                      <img src="" alt="" />
                    </div>
                    <div className='chn_info'>
                      <p>React Patterns</p>
                      <span>586K Subscribers</span>
                    </div>
                  </div>
                  <div className='right'>
                    <button><UserPlus /> Subscribe</button>
                  </div>
                </div>
                <hr />
                <div className='description'>
                     Dive into the world of React with our latest tutorial series: "Advanced React Patterns"! 🛠️ Whether you're a seasoned developer or just starting out, this series is designed to elevate your React skills to the next level.
                </div>
              </div>
              <div className='comment'>
                
              </div>
            </div>
            <div className='video-list'>

            </div>
        </div>
      </div>
      
    </>
  )
}
