import React, { useState, useEffect } from 'react'
import Page from '../../components/Page'
import Card from './Card'
import DeckNav from './DeckNav'
import NavSettings from './NavSettings'

function Deck(props: any) {
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
