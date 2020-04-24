import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Topic from './pages/Topic';
import { ThemeProvider } from '../ThemeContext';
import driver from '../utils/driver';
import db from '../utils/db-client';

function App() {
  useEffect(() => {
    async function init() {
      const x = await db.collection('topics').doc('rH13pSUxAIlACkOAU5pq').get()
      console.log(x.data())
    }
    init()
    
    // db.collection('topics').add({title: 'js', decks: [
    //   {
    //     title: 'if statement',
    //     cards: [
    //       {
    //         "front": "\n            ## if/else/else if statements\n            ",
    //         "back": "\n                if (anyTrueCondition) {\n                    // execute this code...\n                } else if (someOtherTrueCondition) {\n                    // execute this code...\n                } else {\n                    // do this thing if other conditions are not true\n                }\n            ",
    //         "meta": "if/else/else if statements",
    //         "language": "js"
    //       }
    //     ]
    //   }
    // ]})
  }, [])
  const settings = useSelector(state => state.settings)
  return (
    <ThemeProvider value={{theme: settings.activeTheme}}>
      <Router>
        <Route path="/:id" component={Topic} />
      </Router>
    </ThemeProvider>
  );
}
export default App;
