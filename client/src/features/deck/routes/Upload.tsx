import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Card from '../Card/Card'
import DeckNav from '../DeckNav'
import UploadForm from '../UploadForm'
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
      console.log(err)
    }
    
  }

  return (
    <Page loaded={true}>
      <div>
        <div className="deck-builder">
          <div className="deck-builder-nav">
            <div>
              <Link to="/decks/js">Js Deck</Link>
              <FileUpload handleFile={readXML} name="xml">Upload</FileUpload>
              <Button onClick={() => setIncomingCode('')}>Clear</Button>
              <Button type="click" onClick={handleSubmit}>Submit</Button>
            </div>
            <Button onClick={togglePreview}>preview</Button>
          </div>
          <div className="deck-builder-columns">
            <div
              className="deck-builder-columns-form"
              style={{ width: preview ? '0px' : '50%' }}
            >
              <CodeEditor incomingCode={incomingCode} init={code => setIncomingCode(code)} onCodeChange={handleCodeChange} />
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
