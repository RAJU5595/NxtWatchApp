import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const GamingVideoCardItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isThemeLight} = value
      const gamingCardLinkContainer = isThemeLight
        ? 'gaming-card-video-link'
        : 'gaming-card-video-link-dark'
      const {details} = props
      const {id, title, thumbnailUrl, viewCount} = details
      return (
        <Link to={`/videos/${id}`} className={gamingCardLinkContainer}>
          <div className="gaming-video-card-bg-container">
            <img
              alt="video thumbnail"
              src={thumbnailUrl}
              className="gaming-thumbnail-image"
            />
            <p>{title}</p>
            <p>{viewCount} Watching Worldwide</p>
          </div>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoCardItem
