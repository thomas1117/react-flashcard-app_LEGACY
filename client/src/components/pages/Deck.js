import React, { useState, useEffect } from 'react'
import Card from '../../features/deck/Card'
import Page from '../Page'
import DeckNav from '../../features/deck/DeckNav'
import NavSettings from '../../features/deck/NavSettings'

function Deck(props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Page loaded={!loading}>
      <NavSettings deckId={props.match.params.deckId} />

      <div className="Dash">
        <div className="Dash-Nav-container">
          <DeckNav />
        </div>
        <div className="Dash-Card-container">
          <div className="Dash-Card-container-inner">
            <Card />
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Deck
