import React, { useEffect, useState } from 'react'
import { useDeck } from './deckSlice'
import { useSettings } from '../settings/settingsSlice'
interface P {
  keyboardDisabled?: boolean,
  editable?: boolean,
}
export default function DeckNav(props: P) {
  const {
    activeSection,
    activeSectionIndex,
    activeCardIndex,
    activeCard,
    sections,
    cyclingSection,
    atSectionEnd,
    atDeckEnd,
    sectionIds,
    activeCardIds,
    setSection,
    addSection,
    addCard,
    setCard,
    addDeckTitle,
    cycleSection,
    manageSide,
  } = useDeck()
  const {
    cardTimeFront,
    cardTimeBack,
  } = useSettings()

  const [newDeckTitle, setNewDeckTitle] = useState('')
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [newCardTitle, setNewCardTitle] = useState('')

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (cyclingSection || props.keyboardDisabled) {
        return
      }
      const key = e.code
      // e.preventDefault()
      if (key === 'Space') {
        manageSide()
      }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        let diff = key === 'ArrowLeft' ? -1 : 1
        const outOfZeroBound = key === 'ArrowLeft' && activeCardIndex === 0
        const outOfEndBound = key === 'ArrowRight' && atSectionEnd
        const canMove = !outOfZeroBound && !outOfEndBound
        if (canMove) {
          setCard(activeCardIds[activeCardIndex + diff])
        }
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let diff = key === 'ArrowUp' ? -1 : 1
        const outOfZeroBound = key === 'ArrowUp' && activeSectionIndex === 0
        const outOfEndBound = key === 'ArrowDown' && atDeckEnd
        const canMove = !outOfZeroBound && !outOfEndBound
        if (canMove) {
          setSection(sectionIds[activeSectionIndex + diff])
        }
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [
    cycleSection,
    manageSide,
    setCard,
    setSection,
    cyclingSection,
    activeCardIndex,
    activeSectionIndex,
    atSectionEnd,
    atDeckEnd,
    props.keyboardDisabled
  ])

  useEffect(() => {
    let interval: any = null
    if (cyclingSection) {
      interval = setTimeout(() => {
        if (activeCard.side === 'front') {
          manageSide()
        } else {
          if (atSectionEnd) {
            clearInterval(interval)
            cycleSection(false)
            setCard(activeSection.cards[0].id)
            return
          }
          setCard(activeSection.cards[activeCardIndex + 1].id)
        }
      }, (activeCard.side === 'front' ? cardTimeFront : cardTimeBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, [
    activeCard,
    activeCardIndex,
    cyclingSection,
    atSectionEnd,
    cardTimeFront,
    cardTimeBack,
    manageSide,
    setCard,
    cycleSection
  ])
  function  handleDeckSubmit(e) {
    e.preventDefault()
    addDeckTitle(newDeckTitle)
  }
  function  handleSubmit(e) {
    e.preventDefault()
    addSection(newSectionTitle)
    setNewSectionTitle('')
  }
  function handleCardAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addCard(newCardTitle)
    setNewCardTitle('')
  }
  return (
    <nav className="Nav">
      <div className="Nav-children DeckNav-children">
        {/* <h2 className="Nav-title">Decks</h2> */}
        {props.editable && 
        <form onSubmit={handleDeckSubmit}>
          <input 
            style={{zIndex: 1, position: 'relative'}}
            value={newDeckTitle}
            placeholder="DeckTitle"
            onChange={(e) => setNewDeckTitle(e.target.value)}/>
        </form>
        }

        <ul className="Nav-deck">
          {sections.map((section, sectionIndex) => {
            const isActive = activeSection.id === section.id;
            const active = isActive ? 'active' : ''
            return (
              <li
                className="Nav-section-item"
                key={sectionIndex}
                onClick={() => setSection(section.id)}
              >
                <p
                  className={
                    'Nav-deck-item-inner d-flex space-between ' + active
                  }
                >
                  <span>{section.title}</span>
                  {cyclingSection && isActive ? (
                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                        cycleSection(false)
                      }}
                      className="Nav-deck-pause"
                    >
                      &#9611;&#9611;
                    </span>
                  ) : (
                    <span
                      className="Nav-deck-item-inner-icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (section.id == activeSection.id) {
                          cycleSection(!cyclingSection)
                        } else {
                          setSection(section.id)
                          cycleSection(!cyclingSection)
                        }
                      }}
                    >
                      &#8634;
                    </span>
                  )}
                </p>
                <div>
                  {isActive && (
                    <ul
                      onClick={(e) => e.stopPropagation()}
                      className="Nav-deck-sub"
                    >
                      {activeSection.cards.map(
                        (card, cardIndex) => {
                          return (
                            <li
                              key={cardIndex}
                              onClick={(e) => setCard(card.id)}
                              className={
                                activeCard.id == card.id ? 'active' : ''
                              }
                            >
                              {card.meta}
                            </li>
                          )
                        }
                      )}
                    </ul>
                  )}
                  {/* activeSectionIndex == sectionIndex || !activeSection.id && */}
                  {props.editable && isActive &&
                    <form onSubmit={(e) => handleCardAdd(e)}>
                      <input 
                      style={{zIndex: 1, position: 'relative', marginLeft: '1rem'}}
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      placeholder="New Card Title"
                      />
                    </form>
                  }
                </div>
              </li>
            )
          })}
        </ul>
        {props.editable && 
        <form onSubmit={handleSubmit}>
          <input 
            style={{zIndex: 1, position: 'relative'}}
            value={newSectionTitle}
            placeholder="New Section Title"
            onChange={(e) => setNewSectionTitle(e.target.value)}/>
        </form>
        }
      </div>
    </nav>
  )
}
