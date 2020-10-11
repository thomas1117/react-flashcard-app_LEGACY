import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Card from '../../../ui/Card'
import { useDeck } from '../deckSlice'
import CardArrows from './CardArrows'
import CardHeader from './CardHeader'
import CardFront from './CardFront'
import CardBack from './CardBack'

const CardItem = () => {
  const history = useHistory()
  const {
    atSectionEnd,
    activeCard,
    activeCardIndex,
    activeSection,
    setCard,
    manageSide,
  } = useDeck()

  const { meta, front, back, side, language } = activeCard
  useEffect(() => {
    const historyState = side === 'back' ? '?back=true' : ''
    history.push({ search: historyState})
  }, [side])
  return (
    <Card className={'Card-deck-card'} onClick={() => manageSide()}>
      <CardArrows 
        activeCardIndex={activeCardIndex}
        atSectionEnd={atSectionEnd}
        setCard={setCard}
      />
      <CardHeader 
        title={activeSection.title}
        activeCardIndex={activeCardIndex}
        meta={meta}
      />
      {
      side == 'front' ?
      <CardFront front={front} /> 
      :
      <CardBack language={language} back={back} />}
    </Card>
  )
}

export default CardItem