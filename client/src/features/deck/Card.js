import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'
import { Radio, RadioGroup, Stack, Button } from '@chakra-ui/core'

import { useDeck } from './deckSlice'

export default function Card(props) {
  const { activeCard, activeCardIndex, manageSide, activeSection } = useDeck()
  const { meta, front, back, side, language } = activeCard

  function copyToClipboard(e) {
    e.stopPropagation()
    copy(window.location)
  }
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
