import React from 'react'

const ThemeContext = React.createContext('light-mode')

export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

export default ThemeContext