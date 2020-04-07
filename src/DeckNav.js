import React from 'react';

export default function DeckNav(props) {
    return (
        <nav className="Nav">
            <div className="Nav-children">
                <h2 className="Nav-title">Decks</h2>
                <ul className="Nav-deck">
                    {props.decks.map((deck, index) => {
                        return (
                        <li className="Nav-deck-item" key={index} onClick={() => props.selectDeck(index)}>
                            <p className={props.active === deck.title ? 'active' : ''}>{deck.title}</p>
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