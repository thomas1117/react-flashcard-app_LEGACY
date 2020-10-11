import React, { useContext } from 'react'
import axios from 'axios'
import Switch from '../../ui/Switch'
import Settings from './Settings'
import ThemeContext from '../../ThemeContext'
import { BsDownload } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function SettingsNav(props: {
  deckId: any
  onChange: any
  frontTime: any
  backTime: any
  updateSettings: any
}) {
  const ctx = useContext(ThemeContext)
  const downloadDeck = () => {
    axios({
      url: `/api/decks/exports/${props.deckId}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'deck.xml')
      document.body.appendChild(link)
      link.click()
    })
  }
  return (
    <nav className="SettingsNav">
      <ul>
        <li>
          <Link to="/decks" style={{ marginRight: '20px' }}>
            Decks
          </Link>
        </li>
        <li className="SettingsNav-toggle">
          <Switch onChange={props.onChange} />
        </li>
        <li>
          <Settings
            onChange={props.onChange}
            frontTime={props.frontTime}
            backTime={props.backTime}
            updateSettings={props.updateSettings}
          />
        </li>
        <li
          onClick={downloadDeck}
          style={{ marginLeft: '22px', marginTop: '5px' }}
        >
          <BsDownload size="26" />
        </li>
      </ul>
    </nav>
  )
}