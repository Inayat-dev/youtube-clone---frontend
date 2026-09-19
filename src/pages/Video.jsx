import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import "../assets/css/videoDetail.css"
import { ThumbsUp, FolderPlus, UserPlus, UserCheck } from 'lucide-react'
import { Api } from '../api/Api'
import { useParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { X } from 'lucide-react';

export default function Video() {
  const { videoId } = useParams()
  const [videoDetail, setVideoDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentText, setCommentText] = useState('')
  const [likesCount, setLikeCount] = useState(0)
  const [videos, setVideos] = useState();
  const [myLike, setMyLike] = useState();
  const [channel, setChannel] = useState();
  const [playlistShow, setPlaylistShow] = useState(false);


  function formatDuration(seconds = 0) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function timeAgo(dateStr) {
    if (!dateStr) return ''
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months}mo ago`
    return `${Math.floor(months / 12)}y ago`
  }

  useEffect(() => {
    if (!videoId) return
    let ignore = false

    async function fetchVideo() {
      setLoading(true)
      setError(null)
      try {
        const res = await Api.get(`/video/${videoId}`)
        setLikeCount(res.data.data.likes)
        setMyLike(res?.data?.data?.existingLike == null?false:true)
        
        if (!ignore) setVideoDetail(res.data.data)
        
        return res
          
      } catch (err) {
        if (!ignore) setError(err)
      } finally {
        if (!ignore) setLoading(false)
      } 
    }

    async function getComment(){
      const res = await Api.get("/comment/" + videoId)
      setVideoDetail((prev)=>{return { ...prev, comments: res.data.data }})
    }

    async function fetchData() {
        const res = await Api.get("/video")
        setVideos(res?.data?.data || [])
        setLoading(false)
    }

    async function fetchChannel(res){
      const channel1 = await Api(`/subscription/channel/${res?.watch?.owner?._id}`);
      setChannel(channel1.data.data)
    }

    fetchData()
    fetchVideo().then((res)=>{
      fetchChannel(res?.data?.data)
      getComment();
    })
    return () => { ignore = true }
  }, [videoId])

  async function handleAddComment() {
    if (!commentText.trim()) return
    // TODO: await Api.post(`/video/${videoId}/comments`, { text: commentText })
    await Api.post("/comment/"+videoId,{content:commentText, videoId});
    setCommentText('')
    getComment();
  }

  async function getComment(){
    const res = await Api.get("/comment/" + videoId)
    setVideoDetail((prev)=>{return { ...prev, comments: res.data.data }})
  }

  async function handleLike() {
    const prevLikeCount = likesCount;
    const prevMyLike = myLike;

    // optimistic update
    setLikeCount(myLike ? likesCount - 1 : likesCount + 1);
    setMyLike(!myLike);

    try {
      await Api.get("/like/toggle/v/" + videoId);
    } catch (err) {
      // rollback on failure
      setLikeCount(prevLikeCount);
      setMyLike(prevMyLike);
      console.error("Failed to toggle like:", err);
    }
  }

  async function handleSubscription(){
    Api.post(`/subscription/c/${videoDetail?.watch?.owner?._id}`)
    const count = channel.isSubscribed?channel.subscribersCount-1:channel.subscribersCount+1
    setChannel({isSubscribed:!channel.isSubscribed,subscribersCount:count})
  }

  function togglePlaylist(){
    setPlaylistShow((prev)=>{return !prev})
  }

  const watch = videoDetail?.watch

  return (
    <>
    {playlistShow && <div className='playlist-container'>
      <div className='playlist-divs'>
        <div className='playlist-create'>
          <form action="" className='create-playlist-form'>
            <h3><span>Create Playlist</span><span onClick={togglePlaylist}><X></X></span></h3>
            <input type="text" name='name' placeholder='name' />
            <input type="text" name='description' placeholder='description' />
            <button>Create</button>
          </form>
        </div>
        <div className='save-video-playlist'>

          <form action="" className='save-video-form'>
            <h3>Save Video in Playlist</h3>
            <span><input type="checkbox" value="music" name="playlist" id="playlist" /> music</span>
            <span><input type="checkbox" value="music" name="playlist" id="playlist" /> gaming</span>
            <span><input type="checkbox" value="music" name="playlist" id="playlist" /> song</span>
            <span><input type="checkbox" value="music" name="playlist" id="playlist" /> entatainment</span>
            <button>save</button>
          </form>
        </div>
      </div>
    </div>}
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='vd-container'>
          <div className='vd-main'>
            <div className='vd-player'>
              <video src={videoDetail?.watch?.videoFile} controls></video>
            </div>

            {loading && <p>Loading video…</p>}
            {error && <p>Couldn't load this video. Please try again.</p>}

            {!loading && !error && (
              <>
                <div className='vd-details'>
                  <div className='vd-title-row'>
                    <div className='vd-title-left'>
                      <h3>{watch?.title}</h3>
                      <p>{watch?.views ?? 0} Views · {timeAgo(watch?.createdAt)}</p>
                    </div>
                    <div className='vd-title-right'>
                      <div className='vd-like' onClick={()=>{
                        handleLike()
                      }}>
                        {myLike?<ThumbsUp fill="#ae7aff"/>:<ThumbsUp/>} <span>{likesCount ?? 0}</span>
                      </div>
                      <div className='vd-save'>
                        <button onClick={togglePlaylist}><FolderPlus />Save</button>
                      </div>
                    </div>
                  </div>

                  {watch?.owner && (
                    <div className='vd-channel-row'>
                      <div className='vd-channel-left'>
                        <div className='vd-channel-logo'>
                          <img src={watch.owner.avatar} alt={watch.owner.username ?? ''} />
                        </div>
                        <div className='vd-channel-info'>
                          <p>@{watch.owner.username}</p>
                          <p>{channel?.subscribersCount} Subscribers</p>
                        </div>
                      </div>
                      <div className='vd-channel-right'  >
                        <button  onClick={handleSubscription}> 
                          {channel?.isSubscribed == true ? (
                              <>
                                  <UserCheck /> Subscribed
                              </>
                          ) : (
                              <>
                                  <UserPlus /> Subscribe
                              </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <hr />
                  <div className='vd-description'>
                    {watch?.description}
                  </div>
                </div>

                {/* <div className='playlist-container'>
                  <div className='create-playlist'>
                    <h3>Create Playlist</h3>
                    <form className='playlist'>
                      <input type="text" placeholder='Name' name='name'/>
                      <input type="text" placeholder='Description' name='description'/>
                      <button>Create</button>
                    </form>
                  </div>
                  <div className='list-playlist'>
                     
                  </div>
                </div> */}

                <div className='vd-comments'>
                  <div className='vd-comments-counter'>
                    {videoDetail?.comments?.length ?? 0} Comments
                  </div>
                  <div className='vd-comment-input'>
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                    />
                    <button onClick={handleAddComment}>send</button>
                  </div>

                  {videoDetail?.comments?.map((comment) => (
                    <div className='vd-comment-item' key={comment._id}>
                      <div className='vd-comment-avatar'>
                        <img src={comment.owner[0].avatar} alt="" />
                      </div>
                      <div className='vd-comment-body'>
                        <div>{comment.owner[0].username} · {timeAgo(comment.createdAt)}</div>
                        <div>@{comment.owner[0].username}</div>
                        <div>{comment.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className='vd-list'>
            {
              videos?.map((video, key)=>{
                      return <VideoCard video={video} current={"video"} key={key}/>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}