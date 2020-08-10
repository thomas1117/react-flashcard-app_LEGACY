import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import Page from '../Page';
import DeckNav from '../DeckNav';
import SettingsNav from '../SettingsNav';
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
  initDeckCard,
} from '../../store/actions'

function Topic(props) {
  const [loading, setLoading] = useState(true)
  const topic = useSelector(state => state.topic)
  const settings = useSelector(state => state.settings)
  const dispatch = useDispatch()

  function handleCardSelection(index) {
    dispatch(selectCard(index))
  }

  const manageSide = useCallback(() => dispatch(handleToggleSide()), [dispatch])

  const {
    activeDeckIndex,
    activeCardIndex,
    currentDeck,
    currentCard,
    cardGroup,
    timerRunning,
    cardUrl,
    deckUrl,
  } = topic
  const {
    timeCycleBack,
    timeCycleFront,
  } = settings

  useEffect(() => {
    const deckPath = deckUrl ? '/' + deckUrl : ''
    const cardPath = cardUrl ? '/' + cardUrl : ''
    if (deckPath || cardPath) {
      props.history.push(`/js${deckPath}${cardPath}`)
    }
  }, [cardUrl, deckUrl, props.history.push])
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
          if (activeCardIndex >= currentDeck.cards.length - 1) {
            clearInterval(interval)
            pauseCycleDeck()
            handleCardSelection(0)
            return
          }
          dispatch(handleCardIndexChange(1))
        }
      }, (currentCard.side === 'front' ? timeCycleFront : timeCycleBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning, currentCard, currentDeck, activeCardIndex, timeCycleFront, timeCycleBack, dispatch, handleCardSelection, manageSide])
  useEffect(() => {
    const { deck, card, id } = props.match.params
    dispatch(initDeck(id))
    const side = props.location.search === '?back=true' ? 'back' : 'front'
    dispatch(initDeckCard(deck, card, side))
    setLoading(false)
  }, [dispatch])
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
            selectCard={(index) => handleCardSelection(index)}
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
              onClick={() => manageSide()}
              advance={() => dispatch(handleCardIndexChange(1))}
              goBack={() => dispatch(handleCardIndexChange(-1))}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Topic;
