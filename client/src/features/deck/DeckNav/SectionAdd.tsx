import React, { useState } from 'react'
import { useDeck } from '../deckSlice'

export default function SectionAdd() {
    const {
        addSection,
      } = useDeck()
    const [newSectionTitle, setNewSectionTitle] = useState('')
    function  handleSubmit(e) {
        e.preventDefault()
        addSection(newSectionTitle)
        setNewSectionTitle('')
    }
    return (
        <form onSubmit={handleSubmit}>
          <input 
            style={{zIndex: 1, position: 'relative'}}
            value={newSectionTitle}
            placeholder="New Section Title"
            onChange={(e) => setNewSectionTitle(e.target.value)}/>
        </form>
    )
}