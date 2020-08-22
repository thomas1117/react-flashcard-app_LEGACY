import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card';
import Page from '../Page';

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function Upload(props) {
  const card = {
    front: ``,
    back: ``,
    meta: ``,
    language: `js`
  }
  const [sections, setSections] = useState([
    {
      id: createId(),
      title: ``,
      cards: [
        {...card, id: createId()}
      ]
    }
  ])

  const [deckTitle, setDeckTitle] = useState('')

  function addCard(sectionId) {
    setSections(sections => sections.map(x => {
      if (x.id === sectionId) {
        x.cards = [...x.cards, {...card, id: createId(), sectionId}]
      }
      return x
    }))
  }

  function deleteCard(sectionId, cardId) {
    setSections(sections => sections.map(x => {
      if (x.id === sectionId) {
        x.cards = x.cards.filter(x => x.id !== cardId)
      }
      return x
    }))
  }

  function addSection() {
    setSections(sections => [...sections, {
      id: createId(),
      title: ``,
      cards: [
        {...card, id: createId()}
      ]
    }])
  }

  function updateSectionTitle(id, title) {
    setSections(sections => sections.map(x => x.id == id ? {...x, title} : x))
  }

  function updateCard(sectionId, cardId, field, value) {
    setSections(sections => sections.map(section => {
      if (section.id === sectionId) {
        section.cards = section.cards.map(item => {
          if (item.id === cardId) {
            return {...item, [field]: value}
          }
          return item
        })
      }
      return section
    }))
  }

  function deleteSection(id) {
    setSections(sections => sections.filter(x => x.id !== id))
  }
  function previewDeck(e) {
    e.stopPropagation()
    const deckPreview = {
      title: deckTitle,
      sections
    }
  }
  return (
    <Page loaded={true}>
        <div>
          <div className="deck-builder">
            <div>
              <form class="deck-upload" action="/xml" method="post" encType="multipart/form-data">
                  <input type="file" name="xml" />
                  <button type="submit">submit</button>
              </form>
            </div>
            <div class="deck-builder-columns">
              <div class="deck-builder-columns-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input 
                    class="deck-input"
                    style={{marginTop: '2rem'}}
                    type="text"
                    value={deckTitle}
                    onChange={(e) => setDeckTitle(e.target.value)}
                    placeholder="Deck Title"
                    name="title" />
                  <div className="deck-section">
                    {sections.map(section => {
                      return (
                        <div className="deck-section-item" key={section.id}>
                          <div style={{display: 'flex'}}>
                            <input 
                              class="deck-input"
                              type="text"
                              placeholder="Section Title"
                              name="sectionTitle"
                              value={section.title}
                              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                            />
                            <button 
                              className="deck-section-delete"
                              onClick={() => deleteSection(section.id)}>
                              Delete Section
                            </button>
                          </div>
                          {section.cards.map(card => {
                            return (
                              <div key={card.id} className="deck-card">
                                <div className="deck-card-form">
                                  <textarea 
                                    class="deck-input"
                                    placeholder="Front"
                                    value={card.front}
                                    onChange={e => updateCard(section.id, card.id, 'front', e.target.value)}>
                                  </textarea>
                                  <textarea 
                                    class="deck-input"
                                    placeholder="Back"
                                    value={card.back}
                                    onChange={e => updateCard(section.id, card.id, 'back', e.target.value)}>
                                  </textarea>
                                  <input 
                                    class="deck-input deck-meta"
                                    type="text"
                                    placeholder="Section Meta"
                                    name="sectionMeta"
                                    value={section.meta}
                                    onChange={e => updateCard(section.id, card.id, 'meta', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <button className="deck-card-button" onClick={() => deleteCard(section.id, card.id)}>Delete <br />Card</button>
                                </div>
                              </div>
                            )
                          })}
                          <button className="deck-card-add" onClick={() => addCard(section.id)}>Add Card</button>
                        </div>
                      )
                    })}
                    <button className="deck-section-add" onClick={() => addSection()}>Add Section</button>
                  </div>
                  <div class="deck-submit-container">
                    <button class="deck-preview" onClick={previewDeck}>Preview Deck</button>
                    <button class="deck-submit">Submit Deck</button>
                  </div>
                </form>
              </div>
              <div class="deck-builder-columns-preview">
                
              </div>
            </div>
          </div>
        </div>
    </Page>
  );
}
export default Upload;
