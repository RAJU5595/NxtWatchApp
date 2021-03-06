import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import FormattedDate from '../FormattedDate'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const TrendingVideoCardItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isThemeLight} = value
      const {details} = props
      const {id, channel, publishedAt, thumbnailUrl, title, viewCount} = details
      const {name, profileImageUrl} = channel
      const TrendingCardTextContainer = isThemeLight
        ? 'trending-video-card-text-container'
        : 'trending-video-card-text-container-dark'
      return (
        <Link to={`/videos/${id}`} className="trending-card-video-link">
          <div className="trending-video-card-bg-container">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="trending-video-card-thumbnail"
            />
            <div className={TrendingCardTextContainer}>
              <img
                className="trending-video-card-profile-image"
                src={profileImageUrl}
                alt="profile"
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
    }}
  </ThemeContext.Consumer>
)

export default TrendingVideoCardItem
