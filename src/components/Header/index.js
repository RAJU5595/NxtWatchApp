import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {FiLogOut} from 'react-icons/fi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isThemeLight, changeTheTheme} = value
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const renderLightThemeHeader = () => (
        <nav className="nav-bar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="header-logo"
          />
          <ul className="navbar-options-container">
            <li>
              <button className="theme-icon" type="button">
                <FaMoon />
              </button>
            </li>
            <li>
              <img
                alt="profile"
                className="header-profile-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
              <GoThreeBars className="three-bars-icon" />
            </li>
            <li>
              <button
                onClick={onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
              <Popup modal trigger={<FiLogOut className="logout-icon" />}>
                {close => (
                  <div className="popup-container">
                    <p>Are you sure want to logout?</p>
                    <button
                      onClick={() => close()}
                      className="popup-btn-cancel"
                      type="button"
                    >
                      cancel
                    </button>
                    <button
                      className="popup-btn-confirm"
                      onClick={onClickLogout}
                      type="button"
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </nav>
      )
      const renderDarkThemeHeader = () => {}
      if (isThemeLight === true) {
        return renderLightThemeHeader()
      }
      return renderDarkThemeHeader()
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
