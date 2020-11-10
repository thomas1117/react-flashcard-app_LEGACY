import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Link } from '../../../ui'
import Page from '../../../ui/Page'
import Card from '../Card/Card'
import DeckNav from '../DeckNav'
import { useDeck } from '../deckSlice'
import NavSettings from '../NavSettings'

function Deck(props: any) {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const location = useLocation()
  const params: any = useParams()
  const {
    activeSection,
    activeCard,
    getDeck,
    manageSide
  } = useDeck()

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const { cardId, deckId, sectionId } = params
    const jsDeck = deckId === 'js'
    if (jsDeck) {
      getDeck({ deckId, sectionId, cardId })
    } else {
      getDeck({ deckId, sectionId, cardId })
    }
    if (location.search.includes('back')) {
      history.push({ search: location.search })
      manageSide()
    }
  }, [])

  useEffect(() => {
    const back = activeCard.side === 'back' || location.search.includes('?back') ? '?back=true' : ''
    if (activeSection.id && activeCard.id) {
      history.push(
        `/decks/${params.deckId}/${activeSection.id}/${activeCard.id}${back}`
      )
    }
  }, [activeSection.id, activeCard.id])

  return (
    <Page loaded={!loading}>
      <NavSettings />

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
