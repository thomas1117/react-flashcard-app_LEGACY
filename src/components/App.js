import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Topic from './pages/Topic';
import { ThemeProvider } from '../ThemeContext';

function App() {
  const settings = useSelector(state => state.settings)
  return (
    <ThemeProvider value={{theme: settings.activeTheme}}>
      <Router>
        <Route path="/" component={Topic} />
      </Router>
    </ThemeProvider>
  );
}
export default App;
