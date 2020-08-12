import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Topic from './pages/Topic';
import Upload from './pages/Upload';
import { ThemeProvider } from '../ThemeContext';
import { ThemeProvider as ChakraTheme } from "@chakra-ui/core";

function App() {
  const settings = useSelector(state => state.settings)
  return (
    <ChakraTheme>
    <ThemeProvider value={{ theme: settings.activeTheme }}>
      <Router>
        <Route path="/decks/:id/:deck?/:card?" component={Topic} />
        <Route path="/upload" component={Upload} />
      </Router>
    </ThemeProvider>
    </ChakraTheme>
  );
}
export default App;
