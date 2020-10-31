import React, { useState } from 'react'
import axios from 'axios'
import Card from '../Card/Card'
import DeckNav from '../DeckNav'
import UploadForm from '../UploadForm'
import Page from '../../../ui/Page'
import {Button, Link, FileUpload} from '../../../ui'
// import { Link } from 'react-router-dom'
import CodeEditor from '../CodeEditor'
import { useDeck } from '../deckSlice'
import { base64ToXML, readXMLFile } from '../../../utils/xml'

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function Upload() {
  const {
    sections,
    setDeck,
  } = useDeck()

  const [preview, setPreview] = useState(false)
  const [incomingCode, setIncomingCode] = useState('')
  const togglePreview = () => setPreview(!preview)
  async function handleSubmit(e: any) {
    e.preventDefault()
    const result = await axios.post('/api/deck', {title: 'test', sections})
    console.log(result)
  }

  async function readXML(file) {
    try {
      const xml = await readXMLFile(file)
      if (typeof xml === 'string') {
        setIncomingCode(xml)
      }
    } catch {

    }
  }

  return (
    <Page loaded={true}>
      <div>
        <div className="deck-builder">
          <div className="deck-builder-nav">
            <div>
              <form
                onSubmit={handleSubmit}
                className="deck-upload"
                method="post"
              >
                <Link to="/decks/js">Js Deck</Link>
                <FileUpload handleFile={readXML} name="xml">upload</FileUpload>
                <Button type="submit">submit</Button>
              </form>
            </div>
            <Button onClick={togglePreview}>preview</Button>
          </div>
          <div className="deck-builder-columns">
            <div
              className="deck-builder-columns-form"
              style={{ width: preview ? '0px' : '50%' }}
            >
              <CodeEditor incomingCode={incomingCode} onCodeChange={(deck) => setDeck(deck)} />
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
