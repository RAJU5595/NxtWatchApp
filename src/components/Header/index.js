import {withRouter, Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'
import {GoThreeBars} from 'react-icons/go'
import {FiLogOut} from 'react-icons/fi'
import ThemeContext from '../../context/ThemeContext'
import {BtnElement} from '../../styledComponents'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isThemeLight, changeTheTheme} = value
      const NavbarContainerClassName = isThemeLight
        ? 'nav-bar-container'
        : 'nav-bar-container-dark'
      const onClickTheChangeThemeIcon = () => {
        changeTheTheme()
      }
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      const headerLogo = isThemeLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      const themeBtnClassname = isThemeLight ? 'theme-icon' : 'theme-icon-dark'
      const logoutBtnClassname = isThemeLight ? 'logout-btn' : 'logout-btn-dark'
      const threebarsIcon = isThemeLight
        ? 'three-bars-icon'
        : 'three-bars-icon-dark'
      const goToHome = () => {
        const {history} = props
        history.replace('/')
      }
      const goToTrending = () => {
        const {history} = props
        history.replace('/trending')
      }

      const goToGaming = () => {
        const {history} = props
        history.replace('/gaming')
      }
      const goToSavedVideos = () => {
        const {history} = props
        history.replace('/saved-videos')
      }

      return (
        <nav className={NavbarContainerClassName}>
          <Link to="/">
            <BtnElement data-testid="theme" type="button">
              <img
                src={headerLogo}
                alt="website logo"
                className="header-logo"
              />
            </BtnElement>
          </Link>
          <ul className="navbar-options-container">
            <li>
              <button
                onClick={onClickTheChangeThemeIcon}
                className={themeBtnClassname}
                type="button"
              >
                {isThemeLight ? <FaMoon /> : <BiSun />}
              </button>
            </li>
            <li>
              <img
                alt="profile"
                className="header-profile-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
              <Popup
                trigger={
                  <button className="three-bars-btn" type="button">
                    <GoThreeBars className={threebarsIcon} />
                  </button>
                }
                position="bottom center"
              >
                <div className="menu-container">
                  <button className="menu-btn" type="button" onClick={goToHome}>
                    Home
                  </button>
                  <button
                    className="menu-btn"
                    type="button"
                    onClick={goToTrending}
                  >
                    Trending Videos
                  </button>
                  <button
                    onClick={goToGaming}
                    className="menu-btn"
                    type="button"
                  >
                    Gaming Videos
                  </button>
                  <button
                    onClick={goToSavedVideos}
                    className="menu-btn"
                    type="button"
                  >
                    Saved Videos
                  </button>
                </div>
              </Popup>
            </li>
            <li>
              <Popup
                modal
                trigger={
                  <button
                    onClick={onClickLogout}
                    className={logoutBtnClassname}
                    type="button"
                  >
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className="popup-container">
                    <p>Are you sure, you want to logout</p>
                    <div>
                      <button
                        onClick={() => close()}
                        className="popup-btn-cancel"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="popup-btn-confirm"
                        onClick={onClickLogout}
                        type="button"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
              <Popup modal trigger={<FiLogOut className="logout-icon" />}>
                {close => (
                  <div className="popup-container-logout-btn">
                    <p>Are you sure want to logout?</p>
                    <div>
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
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
