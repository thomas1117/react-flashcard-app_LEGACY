import React, { useState, useContext } from 'react'
import Switch from '../../components/ui/Switch'
import ThemeContext from '../../ThemeContext'
import { BsGearFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

export default function Settings(props) {
  const [visible, setVisible] = useState(false)
  const [frontTime, setFrontTime] = useState(props.frontTime)
  const [backTime, setBackTime] = useState(props.backTime)
  const ctx = useContext(ThemeContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    props.updateSettings({ frontTime, backTime })
    setVisible(false)
  }
  const handleDismiss = (e) => {
    setVisible((v) => !v)
    setFrontTime(props.frontTime)
    setBackTime(props.backTime)
  }
  const handleFront = (e) => {
    setFrontTime(Number(e.target.value))
  }
  const handleBack = (e) => {
    setBackTime(Number(e.target.value))
  }
  const handleDark = (data) => {
    props.onChange(data)
  }
  return (
    <div>
      {visible ? (
        <button
          className="Settings-toggle Settings-toggle-close"
          onClick={handleDismiss}
        >
          <FaTimes size="26" />
        </button>
      ) : (
        <button
          className="Settings-toggle"
          onClick={() => setVisible((v) => !v)}
        >
          <BsGearFill size="26" />
        </button>
      )}
      <div
        className="Settings-toggle-overlay"
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="Settings-time-container">
            <fieldset>
              <label className="Settings-time-container-label" htmlFor="Front">
                Front time (seconds)
              </label>
              <input
                id="front"
                type="text"
                className="Settings-front-time Settings-time"
                value={frontTime}
                onChange={handleFront}
                placeholder="Front card time"
              />
            </fieldset>
            <fieldset>
              <label className="Settings-time-container-label" htmlFor="Back">
                Back time (seconds)
              </label>
              <input
                id="back"
                type="text"
                className="Settings-back-time Settings-time"
                value={backTime}
                onChange={handleBack}
                placeholder="Back card time"
              />
            </fieldset>
            <fieldset className="Settings-Switch">
              <Switch
                onChange={handleDark}
                checked={ctx.theme === 'dark-mode'}
              />
            </fieldset>
            <fieldset>
              <div className="Settings-submit-container">
                <button className="Settings-submit">Submit</button>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  )
}
