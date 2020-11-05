import React, { SyntheticEvent, useState } from 'react'
import copy from 'copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'
import Switch from '../../../ui/Switch'

export default (props: any) => {
    const [checked, setChecked] = useState(false)
    function copyToClipboard(e: SyntheticEvent) {
        e.stopPropagation()
        copy(window.location.href)
    }
    function handleChecked() {
      setChecked(!checked)
      props.togglePreview()
    }
    return (
        <>
        <div className="Card-deck">
          <div>
            <span>{props.title}</span>
            <span>{props.meta && ' | '}</span>
            <span>{props.meta}</span>
            {props.editable && <Switch
              checked={checked}
              onChange={handleChecked}
            />}
          </div>
      </div>
    <FaCopy className="Card-copy" onClick={(e) => copyToClipboard(e)} />
    <span className="Card-number">{props.activeCardIndex + 1}</span>
    </>
    )
}