import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const VideoItemCard = props => {
  const {details} = props
  const {id, title, channel, publishedAt, thumbnailUrl, viewCount} = details
  const publishedDate = formatDistanceToNow(new Date(publishedAt))
  const {name, profileImageUrl} = channel
  return (
    <div className="video-item-container">
      <img className="thumbnail-image" src={thumbnailUrl} />
      <div className="video-item-text-container">
        <img className="profile-image-icon" src={profileImageUrl} />
        <div>
          <p>{title}</p>
          <p>{name}</p>
          <div className="views-count-container">
            <p>{viewCount}</p>
            <BsDot />
            <p>{publishedDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItemCard