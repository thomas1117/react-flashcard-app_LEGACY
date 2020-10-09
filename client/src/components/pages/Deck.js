import React, { useState, useEffect } from 'react'
import Card from '../../features/deck/Card'
import Page from '../Page'
// import DeckNav from '../DeckNav'
import DeckNav from '../../features/deck/DeckNav'
import NavSettings from '../NavSettings'
import { useSetting } from '../../hooks'

function Deck(props) {
  const [loading, setLoading] = useState(true)
  const { timeCycleFront, timeCycleBack } = useSetting()

  useEffect(() => {
    // const { sectionId, cardId, deckId } = props.match.params
    // const side = props.location.search === '?back=true' ? 'back' : 'front'
    // initSectionCard({ sectionId, cardId, side, deckId })
    setLoading(false)
  }, [])

  return (
    <Page loaded={!loading}>
      <NavSettings
        deckId={props.match.params.deckId}
        timeCycleFront={timeCycleFront}
        timeCycleBack={timeCycleBack}
      />

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
