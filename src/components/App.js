import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '../ThemeContext';
import Card from './Card';
import Page from './Page';
import DeckNav from './DeckNav';
import SettingsNav from './SettingsNav';
import Switch from './ui/Switch'
import { connect } from 'react-redux';
import { 
  initDeck,
  selectDeck,
  updateSettings,
  cycleDeck,
  pauseCycleDeck,
  selectCard,
  handleToggleSide,
  toggleTheme,
  handleCardIndexChange,
  handleDeckIndexChange,
} from '../store/actions'

function App(props) {
  const [loading, setLoading] = useState(true)
  const { 
    topic,
    settings,
    handleToggleSide,
    pauseCycleDeck,
    selectCard,
    toggleTheme,
    handleCardIndexChange,
    handleDeckIndexChange,
    cycleDeck,
    selectDeck,
    updateSettings,
  } = props
  const  { 
    activeDeckIndex,
    activeCardIndex,
    currentDeck,
    currentCard,
    cardGroup,
    timerRunning,
  } = topic
  const {
    timeCycleBack,
    timeCycleFront,
    activeTheme,
  } = settings
  useEffect(() => {
    let interval = null
    if (timerRunning) {
      interval = setTimeout(() => {
        if (currentCard.side === 'front') {
          handleToggleSide()
        } else {
          if (activeCardIndex >= currentDeck.cards.length - 1) {
            clearInterval(interval)
            pauseCycleDeck()
            selectCard(0)
            return
          }
          handleCardIndexChange(1)
        }
      }, (currentCard.side === 'front' ? timeCycleFront : timeCycleBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning, currentCard, currentDeck, activeCardIndex])
  useEffect(() => {
    props.initDeck()
    setLoading(false)
  }, [])
  function handleKeyPress(e) {
      if (timerRunning) {
        return
      }
      const key = e.code
      // e.preventDefault()
      if (key === 'Space') {
          handleToggleSide()
      }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
          let index = key === 'ArrowLeft' ? -1 : 1
          handleCardIndexChange(index)
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
          let index = key === 'ArrowUp' ? -1 : 1
          handleDeckIndexChange(index)
      }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [])
  return (
    <ThemeProvider value={{theme: activeTheme}}>
    <Page loaded={!loading}>
        <div class="Dash-Nav-desktop">  
          <SettingsNav 
            frontTime={timeCycleFront}
            backTime={timeCycleBack}
            onChange={toggleTheme}
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
              selectCard={selectCard}
              selectDeck={selectDeck} />
          </div>
          <div className="Dash-Card-container">
            <div className="Dash-Card-container-inner">
              <Card
                leftDisabled={activeCardIndex === 0}
                rightDisabled={activeCardIndex === currentDeck.cards.length - 1}
                key={currentCard.id}
                deck={currentDeck.title}
                number={activeCardIndex + 1}
                onClick={handleToggleSide} 
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
    </Page>
  </ThemeProvider>
  );
}
function mapStateToProps(state) {
  return {
    topic: state.topic,
    settings: state.settings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initDeck: () => dispatch(initDeck()),
    selectDeck: (index) => dispatch(selectDeck(index)),
    selectCard: (index) => dispatch(selectCard(index)),
    cycleDeck: () => dispatch(cycleDeck()),
    pauseCycleDeck: () => dispatch(pauseCycleDeck()),
    handleToggleSide: () => dispatch(handleToggleSide()),
    toggleTheme: () => dispatch(toggleTheme()),
    handleCardIndexChange: (diff) => dispatch(handleCardIndexChange(diff)),
    handleDeckIndexChange: (index) => dispatch(handleDeckIndexChange(index)),
    updateSettings: (settings) => dispatch(updateSettings(settings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;
