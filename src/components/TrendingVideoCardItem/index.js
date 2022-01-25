import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import FormattedDate from '../FormattedDate'

import './index.css'

const TrendingVideoCardItem = props => {
  const {details} = props
  const {id, channel, publishedAt, thumbnailUrl, title, viewCount} = details
  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`} className="trending-card-video-link">
      <div className="trending-video-card-bg-container">
        <img src={thumbnailUrl} className="trending-video-card-thumbnail" />
        <div className="trending-video-card-text-container">
          <img
            className="trending-video-card-profile-image"
            src={profileImageUrl}
          />
          <div>
            <p>{title}</p>
            <div className="trending-video-card-mobile-container">
              <p>{name}</p>
              <BsDot className="mobile-dot-item" />
              <div className="trending-video-card-views-container">
                <p>{viewCount} views</p>
                <BsDot />
                <FormattedDate date={publishedAt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TrendingVideoCardItem
