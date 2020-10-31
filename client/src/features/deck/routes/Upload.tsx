import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BsUpload, BsFillTrashFill, BsCursorFill } from 'react-icons/bs'
import axios from 'axios'
import Card from '../Card/Card'
import DeckNav from '../DeckNav'
import Page from '../../../ui/Page'
import {Button, Link, FileUpload} from '../../../ui'
// import { Link } from 'react-router-dom'
import CodeEditor from '../CodeEditor'
import { useDeck } from '../deckSlice'
import { readXMLFile, xmlToJSON } from '../../../utils/xml'

function Upload() {
  const {
    sections,
    setDeck,
  } = useDeck()

  const [preview, setPreview] = useState(false)
  const [incomingCode, setIncomingCode] = useState('')
  const [invalidState, setInvalidState] = useState(false)
  const togglePreview = () => setPreview(!preview)
  async function handleSubmit(e: any) {
    e.preventDefault()
    const result = await axios.post('/api/deck', {title: 'test', sections})
    const id = result.data.id
    console.log(id)
  }

  async function readXML(file) {
    try {
      const xml = await readXMLFile(file)
      if (typeof xml === 'string') {
        setIncomingCode(xml)
        handleCodeChange(xml)
      }
    } catch {

    }
  }

  function handleCodeChange(code) {
    try {
      const newObj = xmlToJSON(code)
      setDeck(newObj)
    } catch(err) {
      if (!invalidState) {
        setInvalidState(true)
      } else {
        setInvalidState(false)
      }
    }
  }

  function handleClear() {
    setIncomingCode('')
    // TODO: add deck default set
    setDeck({title: '', sections: [{cards: []}]})
  }

  function initDeck(code) {
    setIncomingCode(code)
    const newObj = xmlToJSON(code)
    setDeck(newObj)
  }

  return (
    <Page loaded={true}>
      <div>
        <div className="deck-builder">
          <div className="deck-builder-nav">
            <div>
              <Link to="/decks/js">Js Deck</Link>
              <FileUpload handleFile={readXML} name="xml"><BsUpload /></FileUpload>
              <Button onClick={handleClear}><BsFillTrashFill/></Button>
              <Button type="click" onClick={handleSubmit}><BsCursorFill /></Button>
            </div>
            <Button onClick={togglePreview}>
              {preview ? 'Edit Raw' : 'preview'}
            </Button>
          </div>
          <div className="deck-builder-columns">
            <div
              className="deck-builder-columns-form"
              style={{ width: preview ? '1px' : '50%' }}
            >
              <CodeEditor
                invalidState={invalidState}
                incomingCode={incomingCode}
                init={initDeck}
                onCodeChange={handleCodeChange}
              />
            </div>
            <div
              className="deck-builder-columns-preview"
              style={{ width: preview ? '100%' : '50%' }}
            >
              <DeckNav keyboardDisabled={true} />
              <div
                style={{
                  margin: '2rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Upload
