import React, { SyntheticEvent } from 'react'
import copy from 'copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'

export default (props: any) => {
    function copyToClipboard(e: SyntheticEvent) {
        e.stopPropagation()
        copy(window.location.href)
      }
    return (
        <>
        <span className="Card-deck">
        {props.title}
        {props.side === 'back' && ' | ' + props.meta}
      </span>
    <FaCopy className="Card-copy" onClick={(e) => copyToClipboard(e)} />
    <span className="Card-number">{props.activeCardIndex + 1}</span>
    </>
    )
}