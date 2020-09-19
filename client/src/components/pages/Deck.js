import React, { useState, useEffect } from 'react'
import Card from '../Card'
import Page from '../Page'
import DeckNav from '../DeckNav'
import NavSettings from '../NavSettings'
import { useDeck, useSetting, useCard } from '../../hooks'

function Deck(props) {
  const [loading, setLoading] = useState(true)
  const { timeCycleFront, timeCycleBack } = useSetting()
  const {
    sections,
    sectionUrl,
    activeSectionIndex,
    lastSectionIndex,
    currentSection,
    answerCorrect,
    pauseCycleDeck,
    handleDeckIndexChange,
    cycleDeck,
    selectSection,
    initSectionCard,
    timerRunning,
  } = useDeck()

  const {
    currentCard,
    cardUrl,
    selectCard,
    activeCardIndex,
    lastCardIndex,
    handleCardIndexChange,
    manageSide,
  } = useCard()

  const handleCorrect = () => {
    manageSide()
    handleCardIndexChange(1)
    answerCorrect(true)
  }

  const timerDeps = [
    timerRunning,
    currentCard,
    currentSection,
    activeCardIndex,
    timeCycleFront,
    timeCycleBack,
    selectCard,
    manageSide,
  ]

  useEffect(() => {
    // if a deck id exists
    const deckIdPath =
      (props.match.params.deckId && '/' + props.match.params.deckId) || ''
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
            selectCard(0, currentSection.cards[0])
            return
          }
          handleCardIndexChange(1)
        }
      }, (currentCard.side === 'front' ? timeCycleFront : timeCycleBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, timerDeps)
  useEffect(() => {
    const { sectionId, cardId, deckId } = props.match.params
    const side = props.location.search === '?back=true' ? 'back' : 'front'
    initSectionCard({ sectionId, cardId, side, deckId })
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
        let diff = key === 'ArrowLeft' ? -1 : 1
        const canAdvance = !(
          diff + activeCardIndex > lastCardIndex || diff + activeCardIndex < 0
        )
        if (canAdvance) {
          handleCardIndexChange(diff)
        }
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let diff = key === 'ArrowUp' ? -1 : 1
        const canAdvance = !(
          diff + activeSectionIndex > lastSectionIndex ||
          diff + activeSectionIndex < 0
        )
        if (canAdvance) {
          handleDeckIndexChange(diff)
          selectCard(0, sections[diff + activeSectionIndex].cards[0])
        }
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [
    timerRunning,
    manageSide,
    activeCardIndex,
    lastCardIndex,
    activeSectionIndex,
    lastSectionIndex,
  ])
  return (
    <Page loaded={!loading}>
      <NavSettings
        deckId={props.match.params.deckId}
        timeCycleFront={timeCycleFront}
        timeCycleBack={timeCycleBack}
      />

      <div className="Dash">
        <div className="Dash-Nav-container">
          <DeckNav
            currentId={currentCard.id}
            active={currentSection.id}
            sections={sections}
            currentSection={currentSection}
            playing={timerRunning}
            cycleDeck={cycleDeck}
            pauseCycleDeck={pauseCycleDeck}
            selectCard={(index, card) => selectCard(index, card)}
            selectSection={(index, deck) => selectSection(index, deck)}
          />
        </div>
        <div className="Dash-Card-container">
          <div className="Dash-Card-container-inner">
            <Card
              leftDisabled={activeCardIndex === 0}
              rightDisabled={
                currentSection.cards &&
                activeCardIndex === currentSection.cards.length - 1
              }
              currentCard={currentCard}
              title={currentSection.title}
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
  )
}
export default Deck
