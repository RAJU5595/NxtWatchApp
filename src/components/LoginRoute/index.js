import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    isShowErrorMsg: false,
    errorMsg: '',
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isShowErrorMsg: true, errorMsg})
  }

  getFormDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApi, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
    }
  }

  showThePassword = event => {
    this.setState({isShowPassword: event.target.checked})
  }

  render() {
    const {
      username,
      password,
      isShowPassword,
      errorMsg,
      isShowErrorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isThemeLight} = value
          const renderLightThemeView = () => (
            <div className="login-bg-container">
              <div className="login-bg-card">
                <img
                  className="login-logo"
                  alt="website logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                />
                <form className="form-container" onSubmit={this.getFormDetails}>
                  <label className="label-text" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    className="input-container"
                    type="text"
                    id="username"
                    onChange={this.getUsername}
                    value={username}
                  />
                  <label className="label-text" htmlFor="password">
                    PASSWORD
                  </label>
                  {isShowPassword ? (
                    <input
                      className="input-container"
                      type="text"
                      id="password"
                      onChange={this.getPassword}
                      value={password}
                    />
                  ) : (
                    <input
                      className="input-container"
                      type="password"
                      id="password"
                      onChange={this.getPassword}
                      value={password}
                    />
                  )}
                  <div className="show-passwd-container">
                    <input
                      onClick={this.showThePassword}
                      type="checkbox"
                      id="show-password"
                    />
                    <label htmlFor="show-password">Show Password</label>
                  </div>
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                  {isShowErrorMsg && <p>*{errorMsg}</p>}
                </form>
              </div>
            </div>
          )

          const renderDarkThemeView = () => {}

          if (isThemeLight === true) {
            return renderLightThemeView()
          }
          return renderDarkThemeView()
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default LoginRoute
