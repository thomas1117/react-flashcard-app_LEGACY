import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import cardData from './seed';
import DeckNav from './DeckNav';

function App() {
  const [cardIndex, setActiveCardByIndex] = useState(0)
  const [deckIndex, changeDeck] = useState(0)
  const [currentDeck, setDeck] = useState(cardData[deckIndex])
  const [currentCard, setCard] = useState(currentDeck.cards[cardIndex])
  const [timerRunning, setTimerCycle] = useState(false);
  const [start, setStart] = useState(true);

  function handleToggleSide(cb) {
    setCard(currentCard => {
      let item = {...currentCard, side: currentCard.side === 'front' ? 'back' : 'front'}
      if (cb) {
        cb(item)
      }
      return item
    })
  }

  function handleCardIndexChange(num) {
    setActiveCardByIndex(currIndex => currIndex + num)
  }

  function handleDeckChange(num) {
    changeDeck((i) => {
      const offset = i + num
      let index = 0
      if (offset < 0) {
        index = 0
      } else if (offset > 0 && offset >= cardData.length) {
        index = offset - 1
      } else if (offset > 0 && offset < cardData.length) {
        index = offset
      }
      return index
    })
  }

  function selectDeck(index) {
    setTimerCycle(false)
    changeDeck(index)
  }

  function selectCard(index) {
    setTimerCycle(false)
    setActiveCardByIndex(index)
  }

  function handleKeyPress(e) {
    const key = e.code
    if (key === 'Space') {
      handleToggleSide()
    }
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      let index = key === 'ArrowLeft' ? -1 : 1
      handleCardIndexChange(index)
    }
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      let index = key === 'ArrowUp' ? -1 : 1
      handleDeckChange(index)
    }
  }

  useEffect(() => {
    let limit = currentDeck.cards.length - 1
    if (cardIndex >= 0 && cardIndex <= limit) {
      setCard(x => currentDeck.cards[cardIndex])
    }
    if (cardIndex <= 0) {
      setActiveCardByIndex(0)
    }
    if (cardIndex >= limit) {
      setActiveCardByIndex(limit)
    }
  }, [cardIndex, currentDeck])

  useEffect(() => {
    setDeck(cardData[deckIndex])
    setCard(cardData[deckIndex].cards[0])
    setActiveCardByIndex(0)
  }, [deckIndex])

  function possiblyAdvance(start, cb) {
    handleToggleSide(item => {
        if (item.side === 'front') {
          setActiveCardByIndex(c => {
            let withinBounds = c + 1 < currentDeck.cards.length
            if (withinBounds) {
              return c + 1
            }
            cb()
            return 0
          })
        }
    })
  }

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        possiblyAdvance(start, () => {
          // for some reason I had to set this manually...
          setCard(currentDeck.cards[0])
          setTimerCycle(false)
        })
        setStart(false)
      }, 3000);
    } else if (!timerRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, start]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [])
  return (
    <div className="App">
      <button className="Card-button Card-cycle-button" onClick={() => setTimerCycle(true)}><span>Cycle deck</span> &#8634;</button>
      <div className="Dash">
        <div>
          <DeckNav 
            currentId={currentCard.id}
            active={currentDeck.title}
            decks={cardData}
            selectCard={selectCard}
            selectDeck={selectDeck} />
        </div>
        <div className="Card-container">
          <div className="Card-container-inner">
            <div className="Card-actions-app">
                <button className="Card-button Card-button-back" onClick={() => handleCardIndexChange(-1)}>&#x2190;</button>
                <button className="Card-button Card-button-advance" onClick={() => handleCardIndexChange(1)}>&#x2192;</button>
            </div>
            <Card
              key={currentCard.id}
              number={cardIndex + 1}
              onClick={() => handleToggleSide()} 
              advance={() => handleCardIndexChange(1)}
              goBack={() => handleCardIndexChange(-1)}
              front={currentCard.front} 
              back={currentCard.back} 
              side={currentCard.side} 
              language={currentCard.language} 
            />
          </div>
        </div>
        </div>
      </div>
  );
}

export default App;
