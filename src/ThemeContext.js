import React from 'react'

const ThemeContext = React.createContext({theme: 'light-mode'})

export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

export default ThemeContext