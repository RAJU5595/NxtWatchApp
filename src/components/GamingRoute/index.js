import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import GamingVideoCardItem from '../GamingVideoCardItem'
import './index.css'
import SideNavBar from '../SideNavBar'
import {LoaderContainer} from '../../styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {
    gamingVideosList: [],
    gamingApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({gamingApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const gamingVideoUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(gamingVideoUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {videos} = data
      const updatedData = videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        gamingApiStatus: apiStatusConstants.success,
        gamingVideosList: updatedData,
      })
    } else {
      this.setState({gamingApiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryBtn = () => {
    this.getTrendingVideos()
  }

  render() {
    const {gamingVideosList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const gamingContentContainer = isThemeLight
            ? 'gaming-content-container'
            : 'gaming-content-container-dark'
          const gamingBannerContainer = isThemeLight
            ? 'gaming-banner-container'
            : 'gaming-banner-container-dark'
          const renderLightThemeGaming = () => (
            <div className="gaming-bg-container">
              <Header />
              <div className="gaming-content-and-side-navbar-container">
                <SideNavBar />
                <div className={gamingContentContainer}>
                  <div className={gamingBannerContainer}>
                    <SiYoutubegaming className="gaming-play-logo" />
                    <h1>Gaming</h1>
                  </div>
                  <div className="gaming-video-list-container">
                    {gamingVideosList.map(eachItem => (
                      <GamingVideoCardItem
                        key={eachItem.id}
                        details={eachItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )

          const failureLightThemeGaming = () => (
            <div className="gaming-bg-container">
              <Header />
              <div className="gaming-content-and-side-navbar-container">
                <SideNavBar />
                <div className="gaming-content-container">
                  <div className="gaming-banner-container">
                    <SiYoutubegaming className="gaming-play-logo" />
                    <h1>Gaming</h1>
                  </div>
                  <div className="failure-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                      alt="failure view"
                      className="failure-image"
                    />
                    <h1>Oops! Something Went Wrong</h1>
                    <p>
                      We are having some trouble to complete your request.
                      Please try again.
                    </p>
                    <button onClick={this.onClickRetryBtn} type="button">
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderLoaderView = () => (
            <div className="gaming-bg-container">
              <Header />
              <div className="gaming-content-and-side-navbar-container">
                <SideNavBar />
                <div className="gaming-content-container">
                  <div className="gaming-banner-container">
                    <SiYoutubegaming className="gaming-play-logo" />
                    <h1>Gaming</h1>
                  </div>
                  <LoaderContainer data-testid="loader">
                    <Loader type="ThreeDots" />
                  </LoaderContainer>
                </div>
              </div>
            </div>
          )

          const renderAllLightThemeGaming = () => {
            const {gamingApiStatus} = this.state
            switch (gamingApiStatus) {
              case apiStatusConstants.success:
                return renderLightThemeGaming()
              case apiStatusConstants.failure:
                return failureLightThemeGaming()
              case apiStatusConstants.inProgress:
                return renderLoaderView()
              default:
                return null
            }
          }
          return renderAllLightThemeGaming()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default GamingRoute
