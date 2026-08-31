import React, { useEffect } from 'react'
import { Play } from 'lucide-react';
import "../assets/css/Videos.css"
import { Api } from '../api/Api';
import VideoCard from './VideoCard';

export default function Videos() {

    const [videos, setVideos] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        async function fetchData() {
            const res = await Api.get("/video")
            setVideos(res?.data?.data || [])
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return null // ya ek loader component daal do

    return (
        <div className='video-container'>
            <EmptyVideo />
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