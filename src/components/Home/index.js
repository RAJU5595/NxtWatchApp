import {Component} from 'react'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideNavbar from '../SideNavBar'
import './index.css'

class Home extends Component {
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
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const renderLightThemeHome = () => (
            <div className="home-bg-container">
              <Header />
              <div className="home-bg-content-container">
                <SideNavbar />
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
