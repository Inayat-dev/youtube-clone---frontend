
import React, { useState, useEffect } from "react";
import "../assets/css/channel.css";
import defaultCoverImage from "../assets/images/defaultCoverImage.jpg";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { Api } from "../api/Api";
import VideoCard from "../components/VideoCard";
import "../assets/css/Videos.css"

const tabs = ["Videos", "Playlist", "Tweets", "Subscribed"];

const ChannelProfile = () => {
  const {channelId} = useParams();  
  const [activeTab, setActiveTab] = useState("Videos");
  const [channelDetail, setChannelDetail] = useState({
    coverImage : defaultCoverImage,
    avatar : "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fullName : "---- ----",
    username : "@----",
    subscribersCount : "----",
    subscribedCount : "----",
    email:"email@e.c",
    isSubscribed:false,
    videos : [],
  });

  

  useEffect(()=>{
    async function fetchChannelData(){
      const res = await Api.post("/users/channel/c/"+channelId);
      const res2 = await Api.get("video/channel/"+res.data.data[0]._id);
      console.log(res2)
      setChannelDetail({...res.data.data[0], videos:res2.data.data})
      
    }

    async function fetchVideo(){
      
    }

    fetchChannelData()
  },[])

  async function subscribe(){
    Api.post(`/subscription/c/${channelDetail?._id}`)
    const count = channelDetail.isSubscribed? channelDetail.subscribersCount-1:channelDetail.subscribersCount+1
    setChannelDetail((prev)=>({...prev, isSubscribed:!prev.isSubscribed,subscribersCount:count}))
  }

  return (
  <div>
    {console.log(channelDetail)}
    <Header></Header>
    <div style={{display:"flex"}}>
      <Sidebar></Sidebar>
      <section className="channel">
        {/* Cover photo */}
        <div className="channel__cover">
          <img src={channelDetail.coverImage || defaultCoverImage} alt="cover" />
        </div>

        <div className="channel__body">
          {/* Avatar + info + subscribe */}
          <div className="channel__top">
            <span className="channel__avatar">
              <img src={channelDetail.avatar} alt="channel avatar" />
            </span>

            <div className="channel__info">
              <h1 className="channel__name">{channelDetail.fullName}</h1>
              <p className="channel__handle">{channelDetail.username}</p>
              <p className="channel__stats">
                {channelDetail.subscribersCount} Subscriber
              </p>
            </div>

            <button
              className={`channel__subscribe ${channelDetail.isSubscribed ? "is-subscribed" : ""}`}
              onClick={subscribe}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <span>{channelDetail.isSubscribed ? "Subscribed" : "Subscribe"}</span>
            </button>
          </div>

          {/* Tabs */}
          <ul className="channel__tabs">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  className={`channel__tab ${activeTab === tab ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* Content area */}
          {activeTab === "Videos" && channelDetail?.videos?.length === 0 && (
            <div className="channel__empty">
              <div className="channel__empty-card">
                <span className="channel__empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </span>
                <h5>No videos uploaded</h5>
                <p>This page has yet to upload a video. Search another page in order to find more videos.</p>
              </div>
            </div>
          )}

          {activeTab === "Videos" && <div className='video-container' style={{padding:"0px"}}>
            {
              channelDetail?.videos?.map((video, key)=>{
                return <VideoCard video={{...video, owner:{avatar:channelDetail.avatar}}} current={"home"} key={key}/>
              })
            }
          </div>}

          {activeTab !== "Videos" && (
            <div className="channel__empty">
              <div className="channel__empty-card">
                <h5>No {activeTab.toLowerCase()} yet</h5>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  </div>
  );
};

export default ChannelProfile;