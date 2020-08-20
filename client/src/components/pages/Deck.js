import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import Page from '../Page';
import DeckNav from '../DeckNav';
import SettingsNav from '../SettingsNav';
import { useDispatch, useSelector } from 'react-redux';
import { useDeck } from '../../hooks'
// import {
  // updateSettings,
  // cycleDeck,
  // pauseCycleDeck,
  // toggleTheme,
  // handleCardIndexChange,
  // handleDeckIndexChange,
  // answerCorrect,
  // // initDeckCard,
// } from '../../store/actions'

function Deck(props) {
  const [loading, setLoading] = useState(true)
  const topic = useSelector(state => state.topic)
  const settings = useSelector(state => state.settings)
  const {
    deck,
    sectionUrl,
    cardUrl,
    isPreview,
    activeCardIndex,
    activeSectionIndex,
    currentCard,
    currentSection,
    handleCardIndexChange,
    answerCorrect,
    pauseCycleDeck,
    handleDeckIndexChange,
    toggleTheme,
    updateSettings,
    cycleDeck,
    selectDeck,
    initDeck,
    initDeckCard,
    selectCard,
    manageSide
  } = useDeck()
  const dispatch = useDispatch()

  const handleCorrect = () => {
    manageSide()
    dispatch(handleCardIndexChange(1))
    dispatch(answerCorrect(true))
  }

  const {
    timerRunning,
  } = topic
  const {
    timeCycleBack,
    timeCycleFront,
  } = settings

  useEffect(() => {
    const deckPath = sectionUrl ? '/' + sectionUrl : ''
    const cardPath = cardUrl ? '/' + cardUrl : ''
    if (deckPath || cardPath) {
      const deckPrefix= isPreview ? 'deck-preview' : 'decks'
      const deckId = !isPreview && '/' + props.match.params.id ? '/' + props.match.params.id : ''
      props.history.push(`/${deckPrefix}${deckId}${deckPath}${cardPath}`)
    }
  }, [cardUrl, sectionUrl, props.history.push])
  useEffect(() => {
    const pushState = currentCard.side === 'back' ? '?back=true' : null
    props.history.push({ search: pushState })
  }, [currentCard.side, props.history.push])
  useEffect(() => {
    let interval = null
    if (timerRunning) {
      interval = setTimeout(() => {
        if (currentCard.side === 'front') {
          manageSide()
        } else {
          if (activeCardIndex >= deck.cards.length - 1) {
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
  }, [timerRunning, currentCard, deck, activeCardIndex, timeCycleFront, timeCycleBack, dispatch, selectCard, manageSide])
  useEffect(() => {
    const { deck, card, id } = props.match.params
    if (id) {
      dispatch(initDeck(id))
    }
    const side = props.location.search === '?back=true' ? 'back' : 'front'
    dispatch(initDeckCard(deck, card, side))
    setLoading(false)
  }, [])
  useEffect(() => {
    function handleKeyPress(e) {
      if (timerRunning) {
        return
      }
      const key = e.code
      // e.preventDefault()
      if (key === 'Space') {
        manageSide()
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
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, timerRunning, manageSide])
  return (
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
          {deck.sections.map((deck, index) => (
            <li
              key={'mobile-link-' + index}
              className={`Dash-Nav-mobile-link ` + (index === activeSectionIndex ? 'active' : '')}
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
            active={currentSection.title}
            decks={deck.sections}
            playing={timerRunning}
            cycleDeck={() => dispatch(cycleDeck())}
            pauseCycleDeck={() => dispatch(pauseCycleDeck())}
            selectCard={(index) => selectCard(index)}
            selectDeck={(index) => selectDeck(index)} />
        </div>
        <div className="Dash-Card-container">
          <div className="Dash-Card-container-inner">
            <Card
              leftDisabled={activeCardIndex === 0}
              rightDisabled={activeCardIndex === 100}
              currentCard={currentCard}
              deck={deck.title}
              number={activeCardIndex + 1}
              onClick={() => manageSide()}
              advance={() => dispatch(handleCardIndexChange(1))}
              goBack={() => dispatch(handleCardIndexChange(-1))}
              correct={() => handleCorrect()} 
              incorrect={() => dispatch(answerCorrect(false))} 
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Deck;
