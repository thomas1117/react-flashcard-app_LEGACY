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
    return (
        <nav className="Nav">
            <div className="Nav-children">
                {/* <h2 className="Nav-title">Decks</h2> */}
                <ul className="Nav-deck">
                    {props.decks.map((deck, index) => {
                        const isActive = props.active === deck.title
                        const active = isActive ? 'active' : ''
                        const isPlaying  = props.playing
                        return (
                        <li className="Nav-deck-item" key={index} onClick={() => props.selectDeck(index)}>
                            <p className={active + ' Nav-deck-item-inner d-flex space-between'}>
                                <span>{deck.title}</span>
                                {
                                    isPlaying && isActive ?
                                    <span onClick={(e) => pauseCycleDeck(e, index)}>&#9611; &#9611;</span> :
                                    <span 
                                    className="Nav-deck-item-inner-icon"
                                    onClick={(e) => selectCycleDeck(e, index)}>
                                        &#8634;
                                    </span>
                                }
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