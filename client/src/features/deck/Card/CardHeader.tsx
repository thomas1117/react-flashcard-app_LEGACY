import React, { SyntheticEvent, useState } from 'react'
import copy from 'copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'
import Switch from '../../../ui/Switch'
import { Select } from '../../../ui/Select'

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
    function handleSelect(e) {
      props.handleSelect(e.target.value)
    }
    return (
        <>
        <div className="Card-deck">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{margin: '1rem'}}>{props.title}</span>
            <span style={{margin: '0rem'}}>{props.meta && ' | '}</span>
            <span style={{margin: '1rem'}}>{props.meta}</span>
            {props.editable && <Switch
            style={{margin: '1rem'}}
              checked={checked}
              onChange={handleChecked}
            />}
            {props.editable && <span onClick={props.flip}>{props.side == 'front' ? 'go to back' : 'go to front'}</span>}
            {props.editable && props.side == 'back' &&
              <Select 
                style={{margin: '1rem'}}
                options={[{label: 'markdown', value: 'markdown'}, {label: 'js', value: 'javascript'}]}
              />
            }
          </div>
      </div>
    <FaCopy className="Card-copy" onClick={(e) => copyToClipboard(e)} />
    <span className="Card-number">{props.activeCardIndex + 1}</span>
    </>
    )
}