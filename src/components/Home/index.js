import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import './index.css'

const sideBarOptionsList = [
  {
    id: 'HOME',
    icon: <AiFillHome />,
    displayText: 'Home',
  },
  {
    id: 'TRENDING',
    icon: <HiFire />,
    displayText: 'Trending',
  },
  {
    id: 'GAMING',
    icon: <SiYoutubegaming />,
    displayText: 'Gaming',
  },
  {
    id: 'SAVED',
    icon: <MdPlaylistAdd />,
    displayText: 'Saved videos',
  },
]

class Home extends Component {
  state = {activeTab: 'Home'}

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const homeVideosApiUrl = 'https://apis.ccbp.in/videos/all'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(homeVideosApiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {activeTab} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const renderLightThemeHome = () => {
            const changeTheCurrentTab = event => {
              console.log(event.target)
            }
            return (
              <div className="home-bg-container">
                <Header />
                <div className="home-bg-content-container">
                  <ul className="sidebar-container">
                    <li>
                      <button type="button">
                        <div id="Trending" className="sidebar-item-container">
                          <HiFire />
                          <p>Trending</p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }

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
