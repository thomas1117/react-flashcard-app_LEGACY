import React from 'react'
import { useDeck } from '../deckSlice'

export default function ActiveCardSection() {
    const { activeSection, activeCard, setCard } = useDeck()
    return  (
        <ul
            onClick={(e) => e.stopPropagation()}
            className="Nav-deck-sub"
        >
            {activeSection.cards.map(
            (card, cardIndex) => {
                return (
                <li
                    key={cardIndex}
                    onClick={(e) => setCard(card.id)}
                    className={
                    activeCard.id === card.id ? 'active' : ''
                    }
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>{card.meta}</span>
                    {/* <MdFlipToBack /> */}
                    </div>
                    
                </li>
                )
            }
            )}
        </ul>
    )
}