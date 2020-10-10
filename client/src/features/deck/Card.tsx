import React, { useState, useEffect, SyntheticEvent } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

import { useDeck } from './deckSlice'

export default function Card() {
  const history = useHistory()
  const location = useLocation()
  const params: any = useParams()
  const {
    atSectionEnd,
    activeCard,
    activeCardIndex,
    activeSection,
    setCard,
    manageSide,
    getDeck,
  } = useDeck()
  const { meta, front, back, side, language } = activeCard

  function copyToClipboard(e: SyntheticEvent) {
    e.stopPropagation()
    copy(window.location.href)
  }
  // TODO: these are pretty confusing... has to do with side effect of location query string
  // TODO: There is a weird bug on load of back at the moment
  useEffect(() => {
    const pushState: string | any =
      activeCard.side === 'back' && !location.search.includes('back')
        ? '?back=true'
        : null
    history.push({ search: pushState })
  }, [activeCard.side])

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
  return (
    <div className="Card" onClick={() => manageSide()}>
      <div className="Card-actions">
        <button
          disabled={activeCardIndex == 0}
          className="Card-button Card-button-back"
          onClick={(e) => setCard(activeCardIndex - 1)}
        >
          &#x2190;
        </button>
        <button
          disabled={atSectionEnd}
          className="Card-button Card-button-advance"
          onClick={(e) => setCard(activeCardIndex + 1)}
        >
          &#x2192;
        </button>
      </div>
      <span className="Card-deck">
        {activeSection.title}
        {side === 'back' && ' | ' + meta}
      </span>
      <FaCopy className="Card-copy" onClick={(e) => copyToClipboard(e)} />
      <span className="Card-number">{activeCardIndex + 1}</span>
      <div className={'Card-front ' + (side !== 'back' ? 'visible' : '')}>
        <ReactMarkdown source={front} />
      </div>

      <div className={'Card-back ' + (side !== 'front' ? 'visible' : '')}>
        {language !== 'md' ? (
          <CodeBlock language={language} value={back} />
        ) : (
          <ReactMarkdown source={back} />
        )}
      </div>
    </div>
  )
}
