import SidebarOptionItem from '../SidebarOptionItem'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const SideNavBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {sideBarOptionsList, activeTabId, isThemeLight} = value
      const renderLightThemeSideNavBar = () => (
        <ul className="sidebar-container">
          {sideBarOptionsList.map(eachItem => (
            <SidebarOptionItem
              key={eachItem.id}
              details={eachItem}
              isActive={activeTabId === eachItem.id}
            />
          ))}
        </ul>
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
