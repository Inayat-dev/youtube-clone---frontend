import React, { useEffect } from 'react'
import { Play } from 'lucide-react';
import "../assets/css/Videos.css"
import { Api } from '../api/Api';
import VideoCard from './VideoCard';

export default function Videos({current}) {

    const [videos, setVideos] = React.useState([])
    const [loading, setLoading] = React.useState(true)


    useEffect(() => {
        async function fetchData() {
            const res = await Api.get("/video")
            setVideos(res?.data?.data || [])
            console.log(res.data.data)
            setLoading(false)
        }
        fetchData()
    }, [])

    

    const videoElements = videos.map((video)=>{
            return <VideoCard video={video} current={"home"}/>
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