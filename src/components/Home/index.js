import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideNavbar from '../SideNavBar'
import VideoItemCard from '../VideoItemCard'
import './index.css'
import {
  BannerContainer,
  SearchBtn,
  LoaderContainer,
  CustomBtn,
} from '../../styledComponents'

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

  onClickRetryBtn = () => {
    this.getHomeVideos()
  }

  returnToHomeView = () => {
    this.setState({searchInput: ''}, this.getHomeVideos)
  }

  getSearchInputOnChange = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {videosList, searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const HomeBgVideosContentContainerClassName = isThemeLight
            ? 'home-bg-videos-content-container'
            : 'home-bg-videos-content-container-dark'
          const renderLightThemeHome = () => (
            <div className="home-bg-container">
              <Header />
              <div className="home-bg-content-container">
                <SideNavbar />
                <div className={HomeBgVideosContentContainerClassName}>
                  <BannerContainer data-testid="banner">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="banner-logo"
                      alt="nxt watch logo"
                    />
                    <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                    <button className="banner-btn" type="button">
                      GET IT NOW
                    </button>
                  </BannerContainer>
                  <div className="home-videos-container">
                    <div className="input-search-container">
                      <input
                        id="search-input"
                        className="input-search-field"
                        type="search"
                        placeholder="Search"
                        value={searchInput}
                        onChange={this.getSearchInputOnChange}
                      />
                      <SearchBtn
                        data-testid="searchButton"
                        onClick={this.getSearchInput}
                        type="button"
                      >
                        <BiSearch />
                      </SearchBtn>
                    </div>
                    <div className="videos-list-bg-container">
                      {videosList.length === 0 ? (
                        <div className="no-videos-container">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                            alt="no videos"
                            className="no-views-image"
                          />
                          <h1>No Search results found</h1>
                          <p>Try different key words or remove search filter</p>
                          <CustomBtn
                            onClick={this.returnToHomeView}
                            type="button"
                          >
                            Retry
                          </CustomBtn>
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
                      <CustomBtn onClick={this.onClickRetryBtn} type="button">
                        Retry
                      </CustomBtn>
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
                    <LoaderContainer data-testid="loader">
                      <Loader type="ThreeDots" />
                    </LoaderContainer>
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

          return renderAllLightThemeHome()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
