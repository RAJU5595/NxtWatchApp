import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import './index.css'
import SideNavBar from '../SideNavBar'
import TrendingVideoCardItem from '../TrendingVideoCardItem'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isThemeLight, savedVideosList} = value
      const videoContentContainer = isThemeLight
        ? 'saved-videos-content-container'
        : 'saved-videos-content-container-dark'
      if (savedVideosList.length === 0) {
        return (
          <div className="saved-videos-bg-container">
            <Header />
            <div className="saved-videos-sidenavbar-and-content-container">
              <SideNavBar />
              <div className={videoContentContainer}>
                <div className="no-saved-videos-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no-save-image"
                  />
                  <h1>No saved videos found</h1>
                  <p>You can save your videos while watching them</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="saved-videos-bg-container">
          <Header />
          <div className="saved-videos-sidenavbar-and-content-container">
            <SideNavBar />
            <div className="saved-videos-content-container">
              <div className="saved-videos-banner-container">
                <MdPlaylistAdd className="saved-videos-logo" />
                <h1>Saved Videos</h1>
              </div>
              <div className="saved-videos-list-container">
                {savedVideosList.map(eachItem => (
                  <TrendingVideoCardItem key={eachItem.id} details={eachItem} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default SavedVideos
