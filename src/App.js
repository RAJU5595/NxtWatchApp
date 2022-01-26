import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import TrendingRoute from './components/TrendingRoute'
import ProtectedRoute from './components/ProtectedRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

const sideBarOptionsList = [
  {
    id: 'HOME',
    displayText: 'Home',
    link: '/',
  },
  {
    id: 'TRENDING',
    displayText: 'Trending',
    link: '/trending',
  },
  {
    id: 'GAMING',
    displayText: 'Gaming',
    link: '/gaming',
  },
  {
    id: 'SAVED-VIDEOS',
    displayText: 'Saved videos',
    link: '/saved-videos',
  },
]

class App extends Component {
  state = {
    isThemeLight: true,
    activeTabId: sideBarOptionsList[0].id,
    savedVideosList: [],
  }

  changeTheTheme = () =>
    this.setState(prevState => ({
      isThemeLight: !prevState.isThemeLight,
    }))

  changeTheActiveTab = Id => {
    this.setState({activeTabId: Id})
  }

  addToSavedVideosList = videoItem => {
    const {savedVideosList} = this.state
    savedVideosList.push(videoItem)
    this.setState({savedVideosList: [...savedVideosList]})
  }

  removeFromSavedList = videoItem => {
    const {savedVideosList} = this.state
    const videoIndex = savedVideosList.findIndex(eachItem => {
      if (eachItem.id === videoItem.id) {
        return true
      }
      return false
    })
    savedVideosList.splice(videoIndex, 1)
    this.setState({savedVideosList: [...savedVideosList]})
  }

  render() {
    const {isThemeLight, activeTabId, savedVideosList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isThemeLight,
          changeTheTheme: this.changeTheTheme,
          sideBarOptionsList,
          activeTabId,
          changeTheActiveTab: this.changeTheActiveTab,
          savedVideosList,
          addToSavedVideosList: this.addToSavedVideosList,
          removeFromSavedList: this.removeFromSavedList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
