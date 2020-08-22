import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Page from '../Page';
import DeckNav from '../DeckNav';
import SettingsNav from '../SettingsNav';
import { useDispatch, useSelector } from 'react-redux';
import { useDeck, useSetting } from '../../hooks'

function Deck(props) {
  const [loading, setLoading] = useState(true)
  const topic = useSelector(state => state.topic)
  const { timeCycleFront, timeCycleBack } = useSetting()
  const {
    title,
    sections,
    sectionUrl,
    cardUrl,
    activeCardIndex,
    activeSectionIndex,
    currentCard,
    currentSection,
    handleCardIndexChange,
    answerCorrect,
    pauseCycleDeck,
    handleDeckIndexChange,
    updateSettings,
    cycleDeck,
    selectDeck,
    initSectionCard,
    selectCard,
    manageSide
  } = useDeck()
  const { toggleTheme } = useSetting()
  const dispatch = useDispatch()

  const handleCorrect = () => {
    manageSide()
    dispatch(handleCardIndexChange(1))
    dispatch(answerCorrect(true))
  }

  const {
    timerRunning,
  } = topic

  useEffect(() => {
    // if a deck id exists
    const deckIdPath = props.match.params.deckId && '/' + props.match.params.deckId || ''
    // if there is a section id present
    const sectionPath = sectionUrl ? '/' + sectionUrl : ''
    // if a card id is present
    const cardPath = cardUrl ? '/' + cardUrl : ''
    
    const isPreview = props.match.path.includes('preview')
    if (sectionPath || cardPath) {
      const deckPrefix = isPreview ? 'deck-preview' : 'decks'
      props.history.push(`/${deckPrefix}${deckIdPath}${sectionPath}${cardPath}`)
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
          if (activeCardIndex >= currentSection.cards.length - 1) {
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
  }, [timerRunning, currentCard, currentSection, activeCardIndex, timeCycleFront, timeCycleBack, dispatch, selectCard, manageSide])
  useEffect(() => {
    const { sectionId, cardId, deckId } = props.match.params
    const side = props.location.search === '?back=true' ? 'back' : 'front'
    initSectionCard({sectionId, cardId, side, deckId})
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
        handleCardIndexChange(index)
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let index = key === 'ArrowUp' ? -1 : 1
        handleDeckIndexChange(index)
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
          onChange={() => toggleTheme()}
          updateSettings={(settings) => updateSettings(settings)} />
      </div>
      <div className="Dash-Nav-mobile">
        <ul className="Dash-Nav-mobile-left">
          {sections.map((deck, index) => (
            <li
              key={'mobile-link-' + index}
              className={`Dash-Nav-mobile-link ` + (index === activeSectionIndex ? 'active' : '')}
              onClick={() => selectDeck(index)}>{title}</li>)
          )}
        </ul>
        <SettingsNav
          frontTime={timeCycleFront}
          backTime={timeCycleBack}
          onChange={() => toggleTheme()}
          updateSettings={(settings) => updateSettings(settings)} />
      </div>

      <div className="Dash">
        <div className="Dash-Nav-container">
          <DeckNav
            currentId={currentCard.id}
            active={currentSection && currentSection.title}
            sections={sections}
            playing={timerRunning}
            cycleDeck={cycleDeck}
            pauseCycleDeck={pauseCycleDeck}
            selectCard={(index) => selectCard(index)}
            selectDeck={(index) => selectDeck(index)} />
        </div>
        <div className="Dash-Card-container">
          <div className="Dash-Card-container-inner">
            <Card
              leftDisabled={activeCardIndex === 0}
              rightDisabled={activeCardIndex === 100}
              currentCard={currentCard}
              title={title}
              number={activeCardIndex + 1}
              onClick={() => manageSide()}
              advance={() => handleCardIndexChange(1)}
              goBack={() => handleCardIndexChange(-1)}
              correct={() => handleCorrect()} 
              incorrect={() => answerCorrect(false)} 
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Deck;
