import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Topic from './pages/Topic';
import Deck from './pages/Deck';
import Upload from './pages/Upload';
import { ThemeProvider } from '../ThemeContext';
import { ThemeProvider as ChakraTheme, theme } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
}

function App() {
  const settings = useSelector(state => state.settings)
  return (
    <ChakraTheme theme={customTheme}>
    <ThemeProvider value={{ theme: settings.activeTheme }}>
      <Router>
        <Route path="/deck-preview/:deck?/:card?" exact component={Deck} />
        <Route path="/decks/:id/:deck?/:card?" component={Topic} />
        <Route path="/upload" component={Upload} />
      </Router>
    </ThemeProvider>
    </ChakraTheme>
  );
}
export default App;
