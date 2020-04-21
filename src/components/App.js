import React, { useState, useEffect } from 'react';
import { themeProvider, ThemeProvider } from '../ThemeContext';
import Card from './Card';
import Page from './Page';
// import cardData from './seed/js/seed';
import cardData from '../seed/js/dynamic-seed';
import DeckNav from './DeckNav';
import Switch from './ui/Switch';
import Settings from './Settings';
import SettingsNav from './SettingsNav';
import { connect } from 'react-redux';
import { 
  initDeck,
  selectDeck,
  updateSettings,
  cycleDeck,
  pauseCycleDeck,
  selectCard,
  cardIndex,
  handleToggleSide,
  handleCardIndexChange,
} from '../store/actions'

function App(props) {
  const [loading, setLoading] = useState(true)
  function getTheme() {
    return localStorage.getItem('theme') || 'light-mode'
    }
  const [activeTheme, setTheme] = useState(getTheme())
  function toggleTheme() {
    setTheme(v => {
        const newTheme = v === 'dark-mode' ? 'light-mode' : 'dark-mode'
        localStorage.setItem('theme', newTheme)
        return newTheme
    })
    }
  useEffect(() => {
    props.initDeck()
    setLoading(false)
  }, [])
  const topic = props.topic
  const  { 
    activeDeckIndex,
    currentDeck,
    currentCard,
    cardGroup,
    timerRunning,
    timeCycleBack,
    timeCycleFront,
    cardIndex
  } = topic
  return (
    <ThemeProvider value={activeTheme}>
    <Page loaded={!loading}>
      {

      }
      <div>
        <div class="Dash-nav-desktop">  
          <SettingsNav 
            frontTime={timeCycleFront}
            backTime={timeCycleBack}
            onChange={toggleTheme}
            activeTheme={activeTheme}
            updateSettings={updateSettings} />
        </div>
        <div className="Dash-Nav-mobile">
          <ul className="Dash-Nav-mobile-left">
            {topic.cardGroup.map((deck, index) => (
              <li 
                className={`Dash-Nav-mobile-link ` + (index === activeDeckIndex ? 'active' : '')}
                onClick={() => props.selectDeck(index)}>{deck.title}</li>)
            )}
          </ul>
          <SettingsNav
            frontTime={timeCycleFront}
            backTime={timeCycleBack}
            onChange={toggleTheme}
            activeTheme={activeTheme}
            updateSettings={updateSettings} />
        </div>
        
        <div className="Dash">
          <div className="Dash-Nav-container">
            <DeckNav 
              currentId={currentCard.id}
              active={currentDeck.title}
              decks={cardGroup}
              playing={timerRunning}
              cycleDeck={cycleDeck}
              pauseCycleDeck={pauseCycleDeck}
              selectCard={props.selectCard}
              selectDeck={props.selectDeck} />
          </div>
          <div className="Card-container">
            <div className="Card-container-inner">
              <Card
                leftDisabled={cardIndex === 0}
                rightDisabled={cardIndex === currentDeck.cards.length - 1}
                key={currentCard.id}
                deck={currentDeck.title}
                number={cardIndex + 1}
                onClick={props.handleToggleSide} 
                advance={() => handleCardIndexChange(1)}
                goBack={() => handleCardIndexChange(-1)}
                meta={currentCard.meta}
                front={currentCard.front} 
                back={currentCard.back} 
                side={currentCard.side}
                showArrows={!timerRunning}
                language={currentCard.language} 
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  </ThemeProvider>
  );
}
function mapStateToProps(state) {
  return {
    topic: state.topic,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initDeck: () => dispatch(initDeck()),
    selectDeck: (index) => dispatch(selectDeck(index)),
    selectCard: (index) => dispatch(selectCard(index)),
    cycleDeck: () => dispatch(cycleDeck()),
    handleToggleSide: () => dispatch(handleToggleSide()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;
