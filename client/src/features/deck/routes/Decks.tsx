import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDeck } from '../deckSlice'
import { useSettings } from '../../settings/settingsSlice'
import Page from '../../../ui/Page'
import Switch from '../../../ui/Switch'
import Card from '../../../ui/Card'

export default () => {
  const { getDecks, decks } = useDeck()
  const { toggleTheme } = useSettings()
  useEffect(() => {
    getDecks()
  }, [])
  return (
    <Page loaded={true} padding="20">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Link to="upload">Uploads</Link>
        <Switch onChange={() => toggleTheme()} />
      </div>
      <h2 className="decks-page-header">Example Decks</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '20px',
        marginBottom: '20px'
      }}>
        <Card to={`/decks/js`}>
          <div style={{padding: '20px'}}>
              js
            </div>
        </Card>
      </div>
      <h2 className="decks-page-header">Available Decks</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '20px'
      }}>
      {decks.map((deck) => (
        <Card to={`/decks/${deck.id}`}>
          <div style={{padding: '20px'}}>
              <Link to={`/decks/${deck.id}`}></Link>
              {deck.title}
            </div>
        </Card>
        ))}
      </div>
    </Page>
  )
}
