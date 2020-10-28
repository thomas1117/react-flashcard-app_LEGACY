import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDeck } from '../deckSlice'
import { useSettings } from '../../settings/settingsSlice'
import Page from '../../../ui/Page'
import Switch from '../../../ui/Switch'

export default () => {
  const { getDecks, decks } = useDeck()
  const { toggleTheme } = useSettings()
  useEffect(() => {
    getDecks()
  }, [getDecks])
  return (
    <Page loaded={true} padding="20">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Link to="upload">Uploads</Link>
        <Switch onChange={() => toggleTheme()} />
      </div>
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
