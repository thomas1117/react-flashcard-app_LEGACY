import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Deck, Decks, Upload, PreviewEditDeck, Login, Signup, UserDecks } from './features/deck/routes'
import { ThemeProvider } from './ThemeContext'
import { ThemeProvider as ChakraTheme, theme } from '@chakra-ui/core'
import 'antd/dist/antd.css';
import { useSettings } from './features/settings/settingsSlice'
import AuthRoute from './features/auth/AuthRoute'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
}

function App() {
  const { activeTheme } = useSettings()
  return (
    <ChakraTheme theme={customTheme}>
      <ThemeProvider value={{ theme: activeTheme }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/upload" component={Upload} />
            <Route
              path="/preview/:deckId?"
              exact
              component={PreviewEditDeck}
            />
            <Route
              path="/deck-preview/:sectionId?/:cardId?"
              exact
              component={Deck}
            />
            <Route path="/decks" exact component={Decks} />
            <Route path="/decks/users/:userId" exact component={UserDecks} />
            <Route path="/decks/:deckId/:sectionId?/:cardId?" component={Deck} />
            <AuthRoute path="/auth-test">
              <h2>test auth route</h2>
            </AuthRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </ChakraTheme>
  )
}
export default App
