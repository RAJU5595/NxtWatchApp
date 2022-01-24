import React from 'react'

const ThemeContext = React.createContext({
  isThemeLight: '',
  changeTheTheme: () => {},
  sideBarOptionsList: [],
  activeTabId: '',
  changeTheActiveTab: () => {},
})

export default ThemeContext
