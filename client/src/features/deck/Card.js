import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

import { useDeck } from './deckSlice'

export default function Card(props) {
  const history = useHistory()
  const location = useLocation()
  const { activeCard, activeCardIndex, manageSide, activeSection } = useDeck()
  const { meta, front, back, side, language } = activeCard

  function copyToClipboard(e) {
    e.stopPropagation()
    copy(window.location)
  }
  // TODO: these are pretty confusing... has to do with side effect of location query string
  // TODO: There is a weird bug on load of back at the moment
  useEffect(() => {
    const pushState =
      activeCard.side === 'back' && !location.search.includes('back')
        ? '?back=true'
        : null
    history.push({ search: pushState })
  }, [activeCard.side])

  useEffect(() => {
    if (location.search.includes('back')) {
      history.push({ search: location.search })
      manageSide()
    }
  }, [])
  return (
    <div className="Card" onClick={() => manageSide()}>
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
