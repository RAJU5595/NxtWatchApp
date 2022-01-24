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
      const {changeTheActiveTab} = value
      const {details, isActive} = props
      const btnClassname = isActive === true ? 'selected-btn' : 'unselected-btn'
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

      return (
        <Link to={link}>
          <li>
            <button
              type="button"
              className={btnClassname}
              onClick={onChangeTheCurrentTab}
            >
              <div className="sidebar-option-container">
                {getTheIcon()}
                <p className="sidebar-option-text">{displayText}</p>
              </div>
            </button>
          </li>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default SidebarOptionItem
