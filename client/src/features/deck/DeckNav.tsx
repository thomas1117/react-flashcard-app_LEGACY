import React, { useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDeck } from './deckSlice'
export default function DeckNav() {
  const history = useHistory()
  const location = useLocation()
  const params: any = useParams()
  const {
    activeSection,
    activeSectionIndex,
    activeCardIndex,
    activeCard,
    sections,
    setSection,
    setCard,
    setSectionByIndex,
    setCardByIndex,
    cycleSection,
    cyclingSection,
    atSectionEnd,
    atDeckEnd,
    cardTimeFront,
    cardTimeBack,
    manageSide,
  } = useDeck()
  useEffect(() => {
    const back = activeCard.side === 'back' || location.search.includes('?back') ? '?back=true' : ''
    if (activeSection.id && activeCard.id) {
      history.push(
        `/decks/${params.deckId}/${activeSection.id}/${activeCard.id}${back}`
      )
    }
  }, [activeSection.id, activeCard.id])

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (cyclingSection) {
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
          setCardByIndex(activeCardIndex + diff)
        }
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let diff = key === 'ArrowUp' ? -1 : 1
        const outOfZeroBound = key === 'ArrowUp' && activeSectionIndex === 0
        const outOfEndBound = key === 'ArrowDown' && atDeckEnd
        const canMove = !outOfZeroBound && !outOfEndBound
        if (canMove) {
          setSectionByIndex(activeSectionIndex + diff)
          setCardByIndex(0)
        }
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [
    cycleSection,
    manageSide,
    activeCardIndex,
    activeSectionIndex,
    atSectionEnd,
    atDeckEnd,
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
            setCard(0)

            return
          }
          setCard(activeCardIndex + 1)
        }
      }, (activeCard.side === 'front' ? cardTimeFront : cardTimeBack) * 1000)
    } else {
      clearTimeout(interval)
    }
    return () => clearInterval(interval)
  }, [activeCard, cycleSection, cyclingSection, atSectionEnd])
  return (
    <nav className="Nav">
      <div className="Nav-children">
        {/* <h2 className="Nav-title">Decks</h2> */}
        <ul className="Nav-deck">
          {sections.map((section, sectionIndex) => {
            const isActive = activeSection.id == section.id;
            const active = isActive ? 'active' : ''
            return (
              <li
                className="Nav-section-item"
                key={sectionIndex}
                onClick={() => setSection(section.id)}
              >
                <p
                  className={
                    active + ' Nav-deck-item-inner d-flex space-between'
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
                        if (activeSectionIndex !== sectionIndex) {
                          setSection(section.id)
                          cycleSection(true)
                        } else {
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
                              onClick={(e) => setCard(cardIndex)}
                              className={
                                activeCardIndex == cardIndex ? 'active' : ''
                              }
                            >
                              {card.meta}
                            </li>
                          )
                        }
                      )}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
