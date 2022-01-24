import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideNavbar from '../SideNavBar'
import VideoItemCard from '../VideoItemCard'
import './index.css'

class Home extends Component {
  state = {videosList: [], searchInput: ''}

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {searchInput} = this.state
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
      console.log(videos)
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
      this.setState({videosList: updatedData})
    }
  }

  getSearchInput = () => {
    const searchElement = document.getElementById('search-input')
    this.setState({searchInput: searchElement.value}, this.getHomeVideos)
  }

  render() {
    const {searchInput, videosList} = this.state
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
                      alt="website logo"
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
                      {videosList.map(eachItem => (
                        <VideoItemCard key={eachItem.id} details={eachItem} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderDarkThemeHome = () => {}

          if (isThemeLight === true) {
            return renderLightThemeHome()
          }
          return renderDarkThemeHome()
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
