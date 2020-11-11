import React, { useState } from 'react'
import { useDeck } from '../deckSlice'

export default function CardAdd() {
    const [newCardTitle, setNewCardTitle] = useState('')
    const {
        addCard,
      } = useDeck()
    function handleCardAdd(e) {
        e.preventDefault()
        e.stopPropagation()
        addCard(newCardTitle)
        setNewCardTitle('')
      }
    return (
        <form onSubmit={(e) => handleCardAdd(e)}>
            <input 
            style={{zIndex: 1, position: 'relative', marginLeft: '1rem'}}
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="New Card Title"
            />
        </form>
    )
}