import React from 'react'

export default function DeckNav(props) {
  function selectCycleDeck(e, deckIndex) {
    e.stopPropagation()
    props.selectSection(deckIndex)
    return props.cycleDeck(deckIndex)
  }
  function pauseCycleDeck(e, deckIndex) {
    e.stopPropagation()
    return props.pauseCycleDeck(deckIndex)
  }
  function handleCardSelection(e, cardIndex, deckIndex, card) {
    e.stopPropagation()
    props.selectSection(deckIndex)
    props.selectCard(cardIndex, card)
  }
  function handleSectionSelection(deckIndex) {
    props.selectSection(deckIndex)
    props.selectCard(0, props.sections[deckIndex].cards[0])
  }
  return (
    <nav className="Nav">
      <div className="Nav-children">
        {/* <h2 className="Nav-title">Decks</h2> */}
        <ul className="Nav-deck">
          {props.sections.map((deck, deckIndex) => {
            const isActive = props.active == deck.id
            const active = isActive ? 'active' : ''
            const isPlaying = props.playing
            return (
              <li
                className="Nav-deck-item"
                key={deckIndex}
                onClick={() => handleSectionSelection(deckIndex)}
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
                    <ul className="Nav-deck-sub">
                      {props.currentSection.cards.map((card, cardIndex) => {
                        return (
                          <li
                            key={cardIndex}
                            onClick={(e) =>
                              handleCardSelection(e, cardIndex, deckIndex, card)
                            }
                            className={
                              card.id === props.currentId ? 'active' : ''
                            }
                          >
                            {card.meta}
                          </li>
                        )
                      })}
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
