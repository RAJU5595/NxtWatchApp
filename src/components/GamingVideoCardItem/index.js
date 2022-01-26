import {Link} from 'react-router-dom'
import './index.css'

const GamingVideoCardItem = props => {
  const {details} = props
  const {id, title, thumbnailUrl, viewCount} = details
  return (
    <Link to={`/videos/${id}`} className="gaming-card-video-link">
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
}

export default GamingVideoCardItem
