import React, { useState } from 'react';

export default function DeckNav(props) {
    return (
        <nav className="Nav">
            <ul>
                {props.decks.map((deck, index) => {
                    return <li onClick={() => props.selectDeck(index)}>{deck.title}</li>
                })}
            </ul>
        </nav>
    )
}