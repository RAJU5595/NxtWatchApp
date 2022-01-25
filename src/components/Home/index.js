import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideNavbar from '../SideNavBar'
import VideoItemCard from '../VideoItemCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videosList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(homeVideosApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {videos} = data
      const updatedData = videos.map(eachItem => ({
        id: eachItem.id,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSearchInput = () => {
    const searchElement = document.getElementById('search-input')
    this.setState({searchInput: searchElement.value}, this.getHomeVideos)
  }

  render() {
    const {videosList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const renderLightThemeHome = () => (
            <div className="home-bg-container">
              <Header />
              <div className="home-bg-content-container">
                <SideNavbar />
                <div className="home-bg-videos-content-container">
                  <div className="banner-section">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="banner-logo"
                      alt="nxt watch logo"
                    />
                    <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                    <button className="banner-btn" type="button">
                      GET IT NOW
                    </button>
                  </div>
                  <div className="home-videos-container">
                    <div className="input-search-container">
                      <input
                        id="search-input"
                        className="input-search-field"
                        type="search"
                      />
                      <button
                        onClick={this.getSearchInput}
                        className="search-btn"
                        type="button"
                      >
                        <BiSearch />
                      </button>
                    </div>
                    <div className="videos-list-bg-container">
                      {videosList.length === 0 ? (
                        <div className="no-videos-container">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                            alt="no videos"
                            className="no-views-image"
                          />
                        </div>
                      ) : (
                        videosList.map(eachItem => (
                          <VideoItemCard key={eachItem.id} details={eachItem} />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderDarkThemeHome = () => {}

          const failureLightThemeView = () => (
            <div className="home-bg-container">
              <Header />
              <div className="home-bg-content-container">
                <SideNavbar />
                <div className="home-bg-videos-content-container">
                  <div className="banner-section">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="banner-logo"
                      alt="nxt watch logo"
                    />
                    <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                    <button className="banner-btn" type="button">
                      GET IT NOW
                    </button>
                  </div>
                  <div className="home-videos-container">
                    <div className="input-search-container">
                      <input
                        id="search-input"
                        className="input-search-field"
                        type="search"
                      />
                      <button
                        onClick={this.getSearchInput}
                        className="search-btn"
                        type="button"
                      >
                        <BiSearch />
                      </button>
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
                      <button type="button">Retry</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderLoaderView = () => (
            <div className="home-bg-container">
              <Header />
              <div className="home-bg-content-container">
                <SideNavbar />
                <div className="home-bg-videos-content-container">
                  <div className="banner-section">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="banner-logo"
                      alt="nxt watch logo"
                    />
                    <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                    <button className="banner-btn" type="button">
                      GET IT NOW
                    </button>
                  </div>
                  <div className="home-videos-container">
                    <div className="input-search-container">
                      <input
                        id="search-input"
                        className="input-search-field"
                        type="search"
                      />
                      <button
                        onClick={this.getSearchInput}
                        className="search-btn"
                        type="button"
                      >
                        <BiSearch />
                      </button>
                    </div>
                    <div className="loader-container">
                      <Loader type="ThreeDots" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderAllLightThemeHome = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderLightThemeHome()
              case apiStatusConstants.failure:
                return failureLightThemeView()
              case apiStatusConstants.inProgress:
                return renderLoaderView()
              default:
                return null
            }
          }

          if (isThemeLight === true) {
            return renderAllLightThemeHome()
          }
          return renderDarkThemeHome()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
