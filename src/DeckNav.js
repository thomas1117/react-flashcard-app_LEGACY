import React from 'react';

export default function DeckNav(props) {
    return (
        <nav className="Nav">
            <div className="Nav-children">
                <h2 className="Nav-title">Decks</h2>
                <ul>
                    {props.decks.map((deck, index) => {
                        return <li key={index} className={props.active === deck.title ? 'active' : ''} onClick={() => props.selectDeck(index)}>{deck.title}</li>
                    })}
                </ul>
            </div>
        </nav>
    )
}