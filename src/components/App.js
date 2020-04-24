import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '../ThemeContext';
import Card from './Card';
import Page from './Page';
import DeckNav from './DeckNav';
import SettingsNav from './SettingsNav';
import { useDispatch, useSelector } from 'react-redux';
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
  const topic = useSelector(state => state.topic)
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch()
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
          dispatch(handleToggleSide())
        } else {
          if (activeCardIndex >= currentDeck.cards.length - 1) {
            clearInterval(interval)
            pauseCycleDeck()
            selectCard(0)
            return
          }
          dispatch(handleCardIndexChange(1))
        }
      }, (currentCard.side === 'front' ? timeCycleFront : timeCycleBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning, currentCard, currentDeck, activeCardIndex])
  useEffect(() => {
    dispatch(initDeck())
    setLoading(false)
  }, [])
  function handleKeyPress(e) {
      if (timerRunning) {
        return
      }
      const key = e.code
      // e.preventDefault()
      if (key === 'Space') {
          dispatch(handleToggleSide())
      }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
          let index = key === 'ArrowLeft' ? -1 : 1
          dispatch(handleCardIndexChange(index))
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
          let index = key === 'ArrowUp' ? -1 : 1
          dispatch(handleDeckIndexChange(index))
      }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress])
  return (
    <ThemeProvider value={{theme: activeTheme}}>
    <Page loaded={!loading}>
        <div className="Dash-Nav-desktop">  
          <SettingsNav 
            frontTime={timeCycleFront}
            backTime={timeCycleBack}
            onChange={() => dispatch(toggleTheme())}
            updateSettings={(settings) => dispatch(updateSettings(settings))} />
        </div>
        <div className="Dash-Nav-mobile">
          <ul className="Dash-Nav-mobile-left">
            {topic.cardGroup.map((deck, index) => (
              <li
                key={'mobile-link-' + index} 
                className={`Dash-Nav-mobile-link ` + (index === activeDeckIndex ? 'active' : '')}
                onClick={() => dispatch(selectDeck(index))}>{deck.title}</li>)
            )}
          </ul>
          <SettingsNav
            frontTime={timeCycleFront}
            backTime={timeCycleBack}
            onChange={() => dispatch(toggleTheme())}
            updateSettings={(settings) => dispatch(updateSettings(settings))} />
        </div>
        
        <div className="Dash">
          <div className="Dash-Nav-container">
            <DeckNav 
              currentId={currentCard.id}
              active={currentDeck.title}
              decks={cardGroup}
              playing={timerRunning}
              cycleDeck={() => dispatch(cycleDeck())}
              pauseCycleDeck={() => dispatch(pauseCycleDeck())}
              selectCard={(index) => dispatch(selectCard(index))}
              selectDeck={(index) => dispatch(selectDeck(index))} />
          </div>
          <div className="Dash-Card-container">
            <div className="Dash-Card-container-inner">
              <Card
                leftDisabled={activeCardIndex === 0}
                rightDisabled={activeCardIndex === currentDeck.cards.length - 1}
                currentCard={currentCard}
                deck={currentDeck.title}
                number={activeCardIndex + 1}
                onClick={() => dispatch(handleToggleSide())} 
                advance={() => dispatch(handleCardIndexChange(1))}
                goBack={() => dispatch(handleCardIndexChange(-1))}
              />
            </div>
          </div>
        </div>
    </Page>
  </ThemeProvider>
  );
}
export default App;
