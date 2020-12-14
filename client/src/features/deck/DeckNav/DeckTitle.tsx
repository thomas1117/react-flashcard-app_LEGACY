import React, { useState, useEffect } from 'react'
import { useDeck } from '../deckSlice'

export default function DeckTitle({deckTitle}) {
    const { addDeckTitle } = useDeck()
    const [newDeckTitle, setNewDeckTitle] = useState('')
    function handleDeckSubmit(e) {
        e.preventDefault()
        addDeckTitle(newDeckTitle)
    }
    useEffect(() => {
        setNewDeckTitle(deckTitle)
    }, [deckTitle])
    return (
    <form onSubmit={handleDeckSubmit}>
        <input 
            style={{zIndex: 1, position: 'relative'}}
            value={newDeckTitle}
            placeholder="Your deck title"
            onChange={(e) => setNewDeckTitle(e.target.value)}
        />
    </form>
    )
}