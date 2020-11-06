import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Page from '../../../ui/Page'
import Card from '../Card/Card'
import DeckNav from '../DeckNav'
import { useDeck } from '../deckSlice'
import NavSettings from '../NavSettings'

function PreviewEditDeck(props: any) {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const location = useLocation()
  const params: any = useParams()
  const {
    activeSection,
    activeCard,
    deckTitle,
    getDeck,
    manageSide
  } = useDeck()

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const { cardId, deckId, sectionId } = params
    const jsDeck = deckId === 'js'
    if (deckId) {
        getDeck({ deckId, sectionId, cardId })
    }
    if (location.search.includes('back')) {
      history.push({ search: location.search })
      manageSide()
    }
  }, [])

  useEffect(() => {
    const back = activeCard.side === 'back' || location.search.includes('?back') ? '?back=true' : ''
    // if (activeSection.id && activeCard.id) {
    //   history.push(
    //     `/preview/${params.deckId}/${activeSection.id}/${activeCard.id}${back}`
    //   )
    // }
  }, [activeSection.id, activeCard.id])

  return (
    <Page loaded={!loading}>
      <NavSettings />

      <div className="Dash">
        <div className="Dash-Nav-container">
          <DeckNav editable={true} keyboardDisabled={true} />
        </div>
        <h2 style={{margin: '1rem'}}>
          {deckTitle}
        </h2>
        <div className="Dash-Card-container">
          <div className="Dash-Card-container-inner">
            <Card editable={true} />
          </div>
        </div>
      </div>
    </Page>
  )
}
export default PreviewEditDeck
