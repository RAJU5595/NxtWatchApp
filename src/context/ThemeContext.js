import React from 'react'

const ThemeContext = React.createContext({
  isThemeLight: '',
  changeTheTheme: () => {},
})

export default ThemeContext
