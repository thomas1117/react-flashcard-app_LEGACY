import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Card from '../Card'
import DeckNav from '../DeckNav'
import Page from '../Page'

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function Upload(props) {
  function makeCard() {
    return {
      id: createId(),
      front: ``,
      back: ``,
      meta: ``,
      language: `js`,
      side: 'front',
    }
  }
  const [sections, setSections] = useState([
    {
      id: createId(),
      title: ``,
      cards: [{ ...makeCard() }],
    },
  ])
  const [currentCard, setCurrentCard] = useState(sections[0].cards[0])
  const [currentSection, setCurrentSection] = useState(sections[0])
  const [preview, setPreview] = useState(false)
  const togglePreview = () => setPreview(!preview)
  const selectCard = (index) => {
    if (!currentSection.cards[index]) {
      return
    }
    setCurrentCard({ ...currentSection.cards[index] })
  }
  const selectDeck = (index) => {
    if (!sections[index]) {
      return
    }
    setCurrentSection({ ...sections[index] })
    setCurrentCard({ ...sections[index].cards[0] })
  }
  const activeCardIndex = 1
  const manageSide = () => {
    setCurrentCard({
      ...currentCard,
      side: currentCard.side === 'front' ? 'back' : 'front',
    })
  }
  const handleCardIndexChange = () => {}
  const handleCorrect = () => {}
  const answerCorrect = () => {}
  const timerRunning = false

  useEffect(() => {
    function handleKeyPress(e) {
      if (timerRunning) {
        return
      }
      const key = e.code
      // e.preventDefault()
      // if (key === 'Space') {
      //   manageSide()
      // }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        let index = key === 'ArrowLeft' ? -1 : 1
        selectCard(index)
      }
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        let index = key === 'ArrowUp' ? -1 : 1
        selectDeck(index)
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [timerRunning, manageSide])

  const [deckTitle, setDeckTitle] = useState('')

  function addCard(sectionId) {
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

  function deleteCard(sectionId, cardId) {
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
        cards: [makeCard()],
      },
    ])
  }

  function updateSectionTitle(id, title) {
    if (id == currentSection.id) {
      setCurrentSection({ ...currentSection, title })
    }
    setSections((sections) =>
      sections.map((x) => (x.id == id ? { ...x, title } : x))
    )
  }

  function updateCard(sectionId, cardId, field, value) {
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

  function deleteSection(id) {
    setSections((sections) => sections.filter((x) => x.id !== id))
  }
  function submitDeck(e) {
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
    <Page loaded={true}>
      <div>
        <div className="deck-builder">
          <div className="deck-builder-nav">
            <button onClick={togglePreview}>preview</button>
            <div>
              <form
                className="deck-upload"
                action="/xml"
                method="post"
                encType="multipart/form-data"
              >
                <input type="file" name="xml" />
                <button type="submit">submit</button>
              </form>
            </div>
          </div>
          <div class="deck-builder-columns">
            <div
              class="deck-builder-columns-form"
              style={{ width: preview ? '0px' : '50%' }}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  class="deck-input"
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
                            class="deck-input"
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
                                  class="deck-input"
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
                                  class="deck-input"
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
                                  class="deck-input deck-meta"
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
                                  onClick={() =>
                                    deleteCard(section.id, card.id)
                                  }
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
                  <button
                    className="deck-section-add"
                    onClick={() => addSection()}
                  >
                    Add Section
                  </button>
                </div>
                <div class="deck-submit-container">
                  <button class="deck-submit" onClick={submitDeck}>
                    Submit Deck
                  </button>
                </div>
              </form>
            </div>
            <div
              class="deck-builder-columns-preview"
              style={{ width: preview ? '100%' : '50%' }}
            >
              <DeckNav
                currentId={currentCard.id}
                active={currentSection && currentSection.id}
                sections={sections}
                currentSection={currentSection}
                selectCard={(index) => selectCard(index)}
                selectDeck={(index) => selectDeck(index)}
              />
              <div
                style={{
                  margin: '2rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card
                  leftDisabled={activeCardIndex === 0}
                  rightDisabled={
                    currentSection.cards &&
                    activeCardIndex === currentSection.cards.length - 1
                  }
                  currentCard={currentCard}
                  title={currentSection.title}
                  number={activeCardIndex + 1}
                  onClick={() => manageSide()}
                  advance={() => handleCardIndexChange(1)}
                  goBack={() => handleCardIndexChange(-1)}
                  correct={() => handleCorrect()}
                  incorrect={() => answerCorrect(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Upload
