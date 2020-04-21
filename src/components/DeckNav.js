import React from 'react';

export default function DeckNav(props) {
    function selectCycleDeck(e, index) {
        e.stopPropagation()
        return props.cycleDeck(index)
    }
    function pauseCycleDeck(e, index) {
        e.stopPropagation()
        return props.pauseCycleDeck(index)
    }
    function handleCardSelection(e, cardIndex, deckIndex) {
        e.stopPropagation()
        props.selectDeck(deckIndex)
        props.selectCard(cardIndex)
    }
    return (
        <nav className="Nav">
            <div className="Nav-children">
                {/* <h2 className="Nav-title">Decks</h2> */}
                <ul className="Nav-deck">
                    {props.decks.map((deck, deckIndex) => {
                        const isActive = props.active === deck.title
                        const active = isActive ? 'active' : ''
                        const isPlaying  = props.playing
                        return (
                        <li className="Nav-deck-item" key={deckIndex} onClick={() => props.selectDeck(deckIndex)}>
                            <p className={active + ' Nav-deck-item-inner d-flex space-between'}>
                                <span>{deck.title}</span>
                                {
                                    isPlaying && isActive ?
                                    <span onClick={(e) => pauseCycleDeck(e, deckIndex)}>&#9611; &#9611;</span> :
                                    <span 
                                    className="Nav-deck-item-inner-icon"
                                    onClick={(e) => selectCycleDeck(e, deckIndex)}>
                                        &#8634;
                                    </span>
                                }
                            </p>
                            <div>
                                <ul className="Nav-deck-sub">
                                    {deck.cards.map((card, cardIndex) => {
                                        return <li key={cardIndex} onClick={(e) => handleCardSelection(e, cardIndex, deckIndex)} className={card.id === props.currentId ? 'active' : ''}>{ card.meta }</li>
                                    })}
                                </ul>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}