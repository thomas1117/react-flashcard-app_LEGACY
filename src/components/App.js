import React from 'react';
import Deck from './pages/Deck';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  
  return (
    <Router>
      <Route path="/" component={Deck} />
    </Router>
  );
}
export default App;
