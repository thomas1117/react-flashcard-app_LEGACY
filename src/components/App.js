import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Topic from './pages/Topic';
import { ThemeProvider } from '../ThemeContext';

function App() {
  const settings = useSelector(state => state.settings)
  return (
    <ThemeProvider value={{ theme: settings.activeTheme }}>
      <Router>
        <Route exact path="/:id" component={Topic} />
        <Route exact path="/:id/:deck" component={Topic} />
        <Route exact path="/:id/:deck/:card" component={Topic} />
      </Router>
    </ThemeProvider>
  );
}
export default App;
