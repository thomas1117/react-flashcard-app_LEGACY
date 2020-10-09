import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDeck } from './deckSlice'
export default function DeckNav(props) {
  const history = useHistory()
  const location = useLocation()
  const {
    activeSectionIndex,
    activeCardIndex,
    activeCard,
    sections,
    setSection,
    setCard,
    cycleSection,
    cyclingSection,
    atSectionEnd,
    timeCycleFront,
    timeCycleBack,
    manageSide,
  } = useDeck()
  useEffect(() => {
    const activeSection = sections[activeSectionIndex]
    const activeCard = activeSection.cards[activeCardIndex]
    const activeSectionId = activeSection.id
    const activeCardId = activeCard.id
    const back = activeCard.side === 'back' ? '?back' : ''
    history.push(`/decks/js/${activeSectionId}/${activeCardId}${back}`)
  }, [sections, activeCardIndex, activeSectionIndex])
  useEffect(() => {
    const foo = location.search.includes('?back')
    const pushState = foo ? '?back=true' : null
    history.push({ search: pushState })
  }, [])

  // useEffect(() => {
  //   function handleKeyPress(e) {
  //     if (timerRunning) {
  //       return
  //     }
  //     const key = e.code
  //     // e.preventDefault()
  //     if (key === 'Space') {
  //       manageSide()
  //     }
  //     if (key === 'ArrowLeft' || key === 'ArrowRight') {
  //       let diff = key === 'ArrowLeft' ? -1 : 1
  //       const canAdvance = !(
  //         diff + activeCardIndex > lastCardIndex || diff + activeCardIndex < 0
  //       )
  //       if (canAdvance) {
  //         handleCardIndexChange(diff)
  //       }
  //     }
  //     if (key === 'ArrowUp' || key === 'ArrowDown') {
  //       let diff = key === 'ArrowUp' ? -1 : 1
  //       const canAdvance = !(
  //         diff + activeSectionIndex > lastSectionIndex ||
  //         diff + activeSectionIndex < 0
  //       )
  //       if (canAdvance) {
  //         handleDeckIndexChange(diff)
  //         selectCard(0, sections[diff + activeSectionIndex].cards[0])
  //       }
  //     }
  //   }
  //   document.addEventListener('keydown', handleKeyPress)
  //   return () => document.removeEventListener('keydown', handleKeyPress)
  // }, [
  //   timerRunning,
  //   manageSide,
  //   activeCardIndex,
  //   lastCardIndex,
  //   activeSectionIndex,
  //   lastSectionIndex,
  // ])

  useEffect(() => {
    let interval = null
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
      }, (activeCard.side === 'front' ? timeCycleFront : timeCycleBack) * 1000)
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
          {sections.map((deck, deckIndex) => {
            const isActive = activeSectionIndex == deckIndex
            const active = isActive ? 'active' : ''
            return (
              <li
                className="Nav-deck-item"
                key={deckIndex}
                onClick={() => setSection(deckIndex)}
              >
                <p
                  className={
                    active + ' Nav-deck-item-inner d-flex space-between'
                  }
                >
                  <span>{deck.title}</span>
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
                        if (activeSectionIndex !== deckIndex) {
                          setSection(deckIndex)
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
                      {sections[activeSectionIndex].cards.map(
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
