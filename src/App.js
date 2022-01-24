import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {isThemeLight: true}

  changeTheTheme = () =>
    this.setState(prevState => ({
      isThemeLight: !prevState.isThemeLight,
    }))

  render() {
    const {isThemeLight} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isThemeLight,
          changeTheTheme: this.changeTheTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
