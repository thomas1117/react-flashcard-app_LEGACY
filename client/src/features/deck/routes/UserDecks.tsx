import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeck } from '../deckSlice'
import { useSettings } from '../../settings/settingsSlice'
import Page from '../../../ui/Page'
import Switch from '../../../ui/Switch'
import Card from '../../../ui/Card'

export default function UserDecks () {
  const params: any = useParams()
  const { getUserDecks, decks } = useDeck()
  const { toggleTheme } = useSettings()
  useEffect(() => {
    getUserDecks(params.userId)
  }, [params.userId])
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
      </ul>
      <h2>Your Decks</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '20px'
      }}>
      {decks.map((deck) => (
          <Card to={`/decks/${deck.id}`}>
            <div style={{padding: '20px'}}>
            {/* <Link to={`/decks/${deck.id}`}></Link> */}
            {deck.title}
            </div>
          </Card>
          // <div key={`deck-item-${deck.id}`} className="decks-page-item Card" style={{padding: '20px'}}>
          //   <div>
          //     <Link to={`/decks/${deck.id}`}></Link>
          //     {deck.title}
          //   </div>
          // </div>
        ))}
      </div>
    </Page>
  )
}