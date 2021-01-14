import React  from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import Switch from '../../ui/Switch'
import Settings from './Settings'
import { BsDownload } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDeck } from './deckSlice'

function Actions(props) {
  const location = useLocation()
  const history = useHistory()
  const {
    saveDeck,
  } = useDeck()
  async function handleSave() {
    const r = await saveDeck()
    history.push('/decks/' + r.data.deck.id + '/edit')
  }
  return (
    <h2>
      {props.deckTitle}
      {
        location.pathname.includes('edit') ?
        <>
        {props.deckTitle && '| '}
        {props.deckTitle && <a onClick={props.saveDeck}>save</a>}
        {true && <a onClick={props.deleteDeck}> | delete</a>} 
        </> :
        null
      }
      {
        location.pathname.includes('preview') && props.deckTitle && <a onClick={handleSave}> | save</a>
      }
    </h2>
  )
}

export default function SettingsNav(props: {
  deckId: any
  deckTitle: any
  onChange: any
  frontTime: any
  backTime: any
  updateSettings: any,
  saveDeck?: any
  editable: any,
  deleteDeck?: any
}) {
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
      <Actions 
        deckTitle={props.deckTitle}
        saveDeck={props.saveDeck}
        deleteDeck={props.deleteDeck} 
      />
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
