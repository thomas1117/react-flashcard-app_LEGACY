import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increment, selectCount } from './deckSlice'
import { useDeck } from './deckSlice'
export default function DeckNav(props) {
  const {
    activeSectionIndex,
    activeCardIndex,
    sections,
    setSection,
    setCard,
  } = useDeck()
  const history = useHistory()
  function selectCycleDeck(e, deckIndex) {
    e.stopPropagation()
    props.selectSection(deckIndex)
    return props.cycleDeck(deckIndex)
  }
  function pauseCycleDeck(e, deckIndex) {
    e.stopPropagation()
    return props.pauseCycleDeck(deckIndex)
  }
  useEffect(() => {
    const activeSection = sections[activeSectionIndex]
    const activeCard = activeSection.cards[activeCardIndex]
    const activeSectionId = activeSection.id
    const activeCardId = activeCard.id
    history.push(`/decks/js/${activeSectionId}/${activeCardId}`)
  }, [sections, activeCardIndex, activeSectionIndex])
  return (
    <nav className="Nav">
      <div className="Nav-children">
        {/* <h2 className="Nav-title">Decks</h2> */}
        <ul className="Nav-deck">
          {sections.map((deck, deckIndex) => {
            const isActive = activeSectionIndex == deckIndex
            const active = isActive ? 'active' : ''
            const isPlaying = props.playing
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
                  {isPlaying && isActive ? (
                    <span
                      onClick={(e) => pauseCycleDeck(e, deckIndex)}
                      className="Nav-deck-pause"
                    >
                      &#9611;&#9611;
                    </span>
                  ) : (
                    <span
                      className="Nav-deck-item-inner-icon"
                      onClick={(e) => selectCycleDeck(e, deckIndex)}
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
