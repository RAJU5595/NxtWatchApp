import React from 'react'

const ThemeContext = React.createContext({
  isThemeLight: true,
  changeTheTheme: () => {},
  sideBarOptionsList: [],
  activeTabId: '',
  changeTheActiveTab: () => {},
  savedVideosList: [],
})

export default ThemeContext
