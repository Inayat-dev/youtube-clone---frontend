import React from 'react'
import "../assets/css/SubscriberItem.css"
import { Api } from '../api/Api'

export default function Subscribers({subscriber}) {
  const [subscribed, setSubscribed] = React.useState(subscriber.isSubscribed)

  return (
    <div className='subscriber-element'>
      <div className='subscriber-left'>
        <div className='subscriber-avatar'>
          <img src={subscriber.avatar} alt="" />
        </div>
        <div className='subscriber-info'>
          <h3>{subscriber.username}</h3>
          <span>{subscriber.subscriberCount} subscribers</span>
        </div>
      </div>

      <button
        className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
        onClick={() => {Api.post(`/subscription/c/${subscriber?._id}`); setSubscribed(!subscribed)}}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  )
}