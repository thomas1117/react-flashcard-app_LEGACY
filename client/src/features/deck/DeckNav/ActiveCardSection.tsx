import React from 'react'
import { useDeck } from '../deckSlice'
import TitleInput from './TitleInput'

export default function ActiveCardSection(props) {
    const { activeSection, activeCard, setCard, setCardTitle } = useDeck()
    const editable = props.editable
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
                    onClick={(e) => setCard(card.uiId)}
                    className={
                    activeCard.id === card.id ? 'active' : ''
                    }
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {editable && <TitleInput onDelete={() => console.log(card.id)} title={card.meta} onChange={(e) => setCardTitle(e.target.value)} />}
                        {!editable && <span>{card.meta}</span>}
                    {/* <MdFlipToBack /> */}
                    </div>
                    
                </li>
                )
            }
            )}
        </ul>
    )
}