import React from 'react';

export default function DeckNav(props) {
    return (
        <nav className="Nav">
            <ul>
                {props.decks.map((deck, index) => {
                    return <li key={index} className={props.active === deck.title ? 'active' : ''} onClick={() => props.selectDeck(index)}>{deck.title}</li>
                })}
            </ul>
        </nav>
    )
}