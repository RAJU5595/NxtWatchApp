import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import FormattedDate from '../FormattedDate'
import './index.css'

const VideoItemCard = props => {
  const {details} = props
  const {id, title, channel, publishedAt, thumbnailUrl, viewCount} = details
  const {name, profileImageUrl} = channel
  return (
    <Link to={`videos/${id}`} className="video-card-link">
      <div className="video-item-container">
        <img
          alt="video thumbnail"
          className="thumbnail-image"
          src={thumbnailUrl}
        />
        <div className="video-item-text-container">
          <img
            alt="channel logo"
            className="profile-image-icon"
            src={profileImageUrl}
          />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div className="views-count-container">
              <p>{viewCount}</p>
              <BsDot />
              <FormattedDate date={publishedAt} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoItemCard
