import React from 'react'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { Play } from 'lucide-react';
import { Api } from '../api/Api'
import VideoCard from '../components/VideoCard'


export default function LikedVideos() {
  return (
    <div>
        <Loading/>
        <Header/>
            <div style={{display:"flex"}}>
            <Sidebar/>
            <Videos />
        </div>
    </div>
  )
}

function Videos() {

    const [videos, setVideos] = React.useState([])
    const [loading, setLoading] = React.useState(true)


    useEffect(() => {
        async function fetchData() {
            const res = await Api.get("/video/history/video")
            setVideos(res?.data?.data.videos || [])
            console.log(res.data.data.videos)
            setLoading(false)
        }
        fetchData()
    }, [])

    

    const videoElements = videos.map((video,key)=>{
            return <VideoCard video={video} key={key} current={"home"}/>
    })

    if (loading) return null 

    return (
        <div className='video-container'>
            {
                videos.length==0?
                    <EmptyVideo />:
                    videoElements
            }
        </div>
    )
}

function EmptyVideo() {
    return (
        <div className='empty-video'>
            <Play size={48} />
            <b><h4>No videos available</h4></b>
            <p>There are no videos here available. Please try to search some thing else.</p>
        </div>
    )
}