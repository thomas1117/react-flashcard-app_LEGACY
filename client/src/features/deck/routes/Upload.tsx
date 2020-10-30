import React, { useState } from 'react'
import axios from 'axios'
import Card from '../Card/Card'
import DeckNav from '../DeckNav'
import UploadForm from '../UploadForm'
import Page from '../../../ui/Page'
import { Link } from 'react-router-dom'
import CodeEditor from '../CodeEditor'
import { useDeck } from '../deckSlice'

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function Upload() {
  const {
    setDeck
  } = useDeck()

  function makeCard() {
    return {
      id: createId(),
      front: ``,
      back: ``,
      meta: ``,
      language: `js`,
      side: 'front',
      sectionId: '',
    }
  }
  const [sections] = useState([
    {
      id: createId(),
      title: ``,
      meta: '',
      cards: [{ ...makeCard() }],
    },
  ])
  const [, setCurrentCard] = useState(sections[0].cards[0])
  const [currentSection] = useState(sections[0])
  const [preview, setPreview] = useState(false)
  // not null assertion operator
  const [xmlFile, setXmlFile] = useState(null!)
  const togglePreview = () => setPreview(!preview)
  function handleSubmit(e: any) {
    e.preventDefault()
    const bodyFormData = new FormData()
    bodyFormData.append('xml', xmlFile)
    axios.post('/api/xml', bodyFormData, {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  function addXml(e: any) {
    const file = e.target.files[0]
    if (file) {
      setXmlFile(file)
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
                <input onChange={addXml} type="file" name="xml" />
                <button type="submit">submit</button>
              </form>
            </div>
            <button onClick={togglePreview}>preview</button>
          </div>
          <div className="deck-builder-columns">
            <div
              className="deck-builder-columns-form"
              style={{ width: preview ? '0px' : '50%' }}
            >
              <CodeEditor onCodeChange={(deck) => setDeck(deck)} />
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
