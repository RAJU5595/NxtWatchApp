import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import TrendingVideoCardItem from '../TrendingVideoCardItem'
import './index.css'
import SideNavBar from '../SideNavBar'
import {LoaderContainer} from '../../styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {
    trendingVideosList: [],
    trendingApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingVideoUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingVideoUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {videos} = data
      const updatedData = videos.map(eachItem => ({
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        trendingApiStatus: apiStatusConstants.success,
        trendingVideosList: updatedData,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  onCLickRetryBtn = () => {
    this.getTrendingVideos()
  }

  render() {
    const {trendingVideosList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const renderLightThemeTrending = () => (
            <div className="trending-bg-container">
              <Header />
              <div className="trending-content-and-side-navbar-container">
                <SideNavBar />
                <div className="trending-content-container">
                  <div className="trending-banner-container">
                    <HiFire className="trending-fire-logo" />
                    <h1>Trending</h1>
                  </div>
                  <div className="trending-video-list-container">
                    {trendingVideosList.map(eachItem => (
                      <TrendingVideoCardItem
                        key={eachItem.id}
                        details={eachItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
          const failureLightThemeTrending = () => (
            <div className="trending-bg-container">
              <Header />
              <div className="trending-content-and-side-navbar-container">
                <SideNavBar />
                <div className="failure-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                    alt="failure view"
                    className="failure-image"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>
                    We are having some trouble to complete your request. Please
                    try again.
                  </p>
                  <button onClick={this.onCLickRetryBtn} type="button">
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )

          const renderLoaderView = () => (
            <div className="trending-bg-container">
              <Header />
              <div className="trending-content-and-side-navbar-container">
                <SideNavBar />
                <LoaderContainer data-testid="loader">
                  <Loader type="ThreeDots" />
                </LoaderContainer>
              </div>
            </div>
          )
          const renderDarkThemeTrending = () => {}
          const renderAllLightThemeTrending = () => {
            const {trendingApiStatus} = this.state
            switch (trendingApiStatus) {
              case apiStatusConstants.success:
                return renderLightThemeTrending()
              case apiStatusConstants.failure:
                return failureLightThemeTrending()
              case apiStatusConstants.inProgress:
                return renderLoaderView()
              default:
                return null
            }
          }
          if (isThemeLight === true) {
            return renderAllLightThemeTrending()
          }
          return renderDarkThemeTrending()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingRoute
