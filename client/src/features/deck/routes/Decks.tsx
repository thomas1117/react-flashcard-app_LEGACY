import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDeck } from '../deckSlice'
import Page from '../../../components/Page'
import Switch from '../../../components/ui/Switch'

export default () => {
  const { getDecks, decks, toggleTheme } = useDeck()
  useEffect(() => {
    getDecks()
  }, [])
  return (
    <Page loaded={true}>
      <Switch onChange={() => toggleTheme()} />
      <ul className="decks-page">
        <h2 className="decks-page-header">Static</h2>
        <li className="decks-page-item Card">
          <div>
            <Link to={`/decks/js`}></Link>
            js
          </div>
        </li>
        <h2 className="decks-page-header">Dynamic</h2>
        {decks.map((deck) => (
          <li key={`deck-item-${deck.id}`} className="decks-page-item Card">
            <div>
              <Link to={`/decks/${deck.id}`}></Link>
              {deck.title}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  )
}
