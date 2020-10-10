import React, { useState } from 'react'
import axios from 'axios'

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function Upload() {
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
  const [sections, setSections] = useState([
    {
      id: createId(),
      title: ``,
      meta: '',
      cards: [{ ...makeCard() }],
    },
  ])
  const [currentCard, setCurrentCard] = useState(sections[0].cards[0])
  const [currentSection, setCurrentSection] = useState(sections[0])

  const [deckTitle, setDeckTitle] = useState('')

  function addCard(sectionId: string) {
    setSections((sections) =>
      sections.map((x) => {
        if (x.id === sectionId) {
          x.cards = [...x.cards, { ...makeCard(), sectionId }]
          setCurrentSection({ ...x })
        }
        return x
      })
    )
  }

  function deleteCard(sectionId: string, cardId: string) {
    setSections((sections) =>
      sections.map((x) => {
        if (x.id === sectionId) {
          x.cards = x.cards.filter((x) => x.id !== cardId)
        }
        return x
      })
    )
  }

  function addSection() {
    setSections((sections) => [
      ...sections,
      {
        id: createId(),
        title: ``,
        meta: '',
        cards: [makeCard()],
      },
    ])
  }

  function updateSectionTitle(id: string, title: string) {
    if (id == currentSection.id) {
      setCurrentSection({ ...currentSection, title })
    }
    setSections((sections) =>
      sections.map((x) => (x.id == id ? { ...x, title } : x))
    )
  }

  function updateCard(
    sectionId: string,
    cardId: string,
    field: string,
    value: any
  ) {
    if (currentCard.id === cardId) {
      setCurrentCard({ ...currentCard, [field]: value })
    }
    setSections((sections) =>
      sections.map((section) => {
        if (section.id === sectionId) {
          section.cards = section.cards.map((item) => {
            if (item.id === cardId) {
              return { ...item, [field]: value }
            }
            return item
          })
        }
        return section
      })
    )
  }

  function deleteSection(id: string) {
    setSections((sections) => sections.filter((x) => x.id !== id))
  }
  function submitDeck(e: any) {
    e.stopPropagation()
    const deckPreview = {
      title: deckTitle,
      sections,
    }
    axios.post('/deck', deckPreview).then((resp) => {
      console.log(resp.data)
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        className="deck-input"
        style={{ marginTop: '2rem' }}
        type="text"
        value={deckTitle}
        onChange={(e) => setDeckTitle(e.target.value)}
        placeholder="Deck Title"
        name="title"
      />
      <div className="deck-section">
        {sections.map((section) => {
          return (
            <div className="deck-section-item" key={section.id}>
              <div style={{ display: 'flex' }}>
                <input
                  className="deck-input"
                  type="text"
                  placeholder="Section Title"
                  name="sectionTitle"
                  value={section.title}
                  onChange={(e) =>
                    updateSectionTitle(section.id, e.target.value)
                  }
                />
                <button
                  className="deck-section-delete"
                  onClick={() => deleteSection(section.id)}
                >
                  Delete Section
                </button>
              </div>
              {section.cards.map((card) => {
                return (
                  <div key={card.id} className="deck-card">
                    <div className="deck-card-form">
                      <textarea
                        className="deck-input"
                        placeholder="Front"
                        value={card.front}
                        onChange={(e) =>
                          updateCard(
                            section.id,
                            card.id,
                            'front',
                            e.target.value
                          )
                        }
                      ></textarea>
                      <textarea
                        className="deck-input"
                        placeholder="Back"
                        value={card.back}
                        onChange={(e) =>
                          updateCard(
                            section.id,
                            card.id,
                            'back',
                            e.target.value
                          )
                        }
                      ></textarea>
                      <input
                        className="deck-input deck-meta"
                        type="text"
                        placeholder="Section Meta"
                        name="sectionMeta"
                        value={section.meta}
                        onChange={(e) =>
                          updateCard(
                            section.id,
                            card.id,
                            'meta',
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="deck-card-button"
                        onClick={() => deleteCard(section.id, card.id)}
                      >
                        Delete <br />
                        Card
                      </button>
                    </div>
                  </div>
                )
              })}
              <button
                className="deck-card-add"
                onClick={() => addCard(section.id)}
              >
                Add Card
              </button>
            </div>
          )
        })}
        <button className="deck-section-add" onClick={() => addSection()}>
          Add Section
        </button>
      </div>
      <div className="deck-submit-container">
        <button className="deck-submit" onClick={submitDeck}>
          Submit Deck
        </button>
      </div>
    </form>
  )
}
export default Upload
