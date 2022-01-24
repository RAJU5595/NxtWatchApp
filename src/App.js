import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'

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
  state = {isThemeLight: true, activeTabId: sideBarOptionsList[0].id}

  changeTheTheme = () =>
    this.setState(prevState => ({
      isThemeLight: !prevState.isThemeLight,
    }))

  changeTheActiveTab = Id => {
    this.setState({activeTabId: Id})
  }

  render() {
    const {isThemeLight, activeTabId} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isThemeLight,
          changeTheTheme: this.changeTheTheme,
          sideBarOptionsList,
          activeTabId,
          changeTheActiveTab: this.changeTheActiveTab,
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
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
