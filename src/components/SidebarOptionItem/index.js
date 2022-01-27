import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const SidebarOptionItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {changeTheActiveTab, isThemeLight} = value
      const {details, isActive} = props
      let BtnClassName = null
      if (isThemeLight) {
        BtnClassName = isActive
          ? 'selected-btn selected-btn-light'
          : 'unselected-btn unselected-btn-light'
      } else {
        BtnClassName = isActive
          ? 'selected-btn selected-btn-dark'
          : 'unselected-btn unselected-btn-dark'
      }
      const {id, displayText, link} = details
      const getTheIcon = () => {
        switch (id) {
          case 'HOME':
            return <AiFillHome />
          case 'TRENDING':
            return <HiFire />
          case 'GAMING':
            return <SiYoutubegaming />
          case 'SAVED-VIDEOS':
            return <MdPlaylistAdd />
          default:
            return null
        }
      }

      const onChangeTheCurrentTab = () => {
        changeTheActiveTab(id)
      }

      const sidebarText = isThemeLight ? 'sidebar-text' : 'sidebar-text-dark'
      return (
        <Link to={link}>
          <li>
            <button
              type="button"
              className={BtnClassName}
              onClick={onChangeTheCurrentTab}
            >
              <div className="sidebar-option-container">
                {getTheIcon()}
                <p className={sidebarText}>{displayText}</p>
              </div>
            </button>
          </li>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default SidebarOptionItem
