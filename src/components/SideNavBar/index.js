import SidebarOptionItem from '../SidebarOptionItem'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const SideNavBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {sideBarOptionsList, activeTabId, isThemeLight} = value
      const renderLightThemeSideNavBar = () => (
        <div className="sidebar-container">
          <ul className="sidebar-options-container">
            {sideBarOptionsList.map(eachItem => (
              <SidebarOptionItem
                key={eachItem.id}
                details={eachItem}
                isActive={activeTabId === eachItem.id}
              />
            ))}
          </ul>
          <div>
            <p>CONTACT US</p>
            <div className="contact-us-logos-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-us-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-us-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-us-logo"
              />
            </div>
            <p className="contact-us-description">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
      const renderDarkThemeSideNavbar = () => {}

      if (isThemeLight === true) {
        return renderLightThemeSideNavBar()
      }
      return renderDarkThemeSideNavbar()
    }}
  </ThemeContext.Consumer>
)

export default SideNavBar
