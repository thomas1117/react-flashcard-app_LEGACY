import React, { useState } from 'react'
import { useDeck } from '../deckSlice'

export default function DeckTitle() {
    const { addDeckTitle } = useDeck()
    const [newDeckTitle, setNewDeckTitle] = useState('')
    function handleDeckSubmit(e) {
        e.preventDefault()
        addDeckTitle(newDeckTitle)
    }
    return (
    <form onSubmit={handleDeckSubmit}>
        <input 
            style={{zIndex: 1, position: 'relative'}}
            value={newDeckTitle}
            placeholder="DeckTitle"
            onChange={(e) => setNewDeckTitle(e.target.value)}
        />
    </form>
    )
}