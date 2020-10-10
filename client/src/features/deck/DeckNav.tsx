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
    cycleSection,
    cyclingSection,
    atSectionEnd,
    atDeckEnd,
    timeCycleFront,
    timeCycleBack,
    manageSide,
  } = useDeck()
  useEffect(() => {
    const activeSection = sections[activeSectionIndex]
    const activeCard = activeSection?.cards[activeCardIndex]
    const activeSectionId = activeSection?.id
    const activeCardId = activeCard?.id
    const back = activeCard?.side === 'back' ? '?back' : ''
    if (activeSectionId && activeCardId) {
      history.push(
        `/decks/${params.deckId}/${activeSectionId}/${activeCardId}${back}`
      )
    }
  }, [sections, activeCardIndex, activeSectionIndex])
  useEffect(() => {
    const onBack = location.search.includes('?back')
    const pushState = onBack && '?back=true'
    if (pushState) {
      history.push({ search: pushState })
    }
  }, [])

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
        const canAdvance = !(atSectionEnd || diff + activeCardIndex < 0)
        if (canAdvance) {
          setCard(activeCardIndex + diff)
        }
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let diff = key === 'ArrowUp' ? -1 : 1
        const canAdvance = !(atDeckEnd || diff + activeSectionIndex < 0)
        if (canAdvance) {
          setSection(activeSectionIndex + diff)
          setCard(0)
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
