import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {FiLogOut} from 'react-icons/fi'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const overlayStyles = {
  backgroundColor: '#ffff',
}

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
          <Link to="/">
            <button className="website-logo-btn" type="button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
                className="header-logo"
              />
            </button>
          </Link>
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
              <Popup
                modal
                trigger={
                  <button
                    onClick={onClickLogout}
                    className="logout-btn"
                    type="button"
                  >
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className="popup-container">
                    <p>Are you sure want to logout?</p>
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
      const renderDarkThemeHeader = () => {}
      if (isThemeLight === true) {
        return renderLightThemeHeader()
      }
      return renderDarkThemeHeader()
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
