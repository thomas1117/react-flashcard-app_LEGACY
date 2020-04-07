import React from 'react';

export default function DeckNav(props) {
    function selectCycleDeck(e, index) {
        e.stopPropagation()
        return props.cycleDeck(index)
    }
    return (
        <nav className="Nav">
            <div className="Nav-children">
                {/* <h2 className="Nav-title">Decks</h2> */}
                <ul className="Nav-deck">
                    {props.decks.map((deck, index) => {
                        const active = props.active === deck.title ? 'active' : ''
                        return (
                        <li className="Nav-deck-item" key={index} onClick={() => props.selectDeck(index)}>
                            <p className={active + ' Nav-deck-item-inner d-flex space-between'}>
                                <span>{deck.title}</span>
                                <span className="Nav-deck-item-inner-icon" onClick={(e) => selectCycleDeck(e, index)}>&#8634;</span>
                            </p>
                            <div>
                                <ul className="Nav-deck-sub">
                                    {deck.cards.map((card, index) => {
                                        return <li key={index} onClick={() => props.selectCard(index)} className={card.id === props.currentId ? 'active' : ''}>{ card.meta }</li>
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