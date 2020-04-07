import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import cardData from './seed';
import DeckNav from './DeckNav';

function App() {
  const [cardIndex, setActiveCard] = useState(0)
  const [deckIndex, changeDeck] = useState(0)
  const [currentDeck, setDeck] = useState(cardData[deckIndex])
  const [currentCard, setCard] = useState(currentDeck.cards[cardIndex])
  const [timerRunning, setTimerCycle] = useState(false);
  const [start, setStart] = useState(true);

  function toggleSide(cb) {
    setCard(currentCard => {
      let item = {...currentCard, side: currentCard.side === 'front' ? 'back' : 'front'}
      if (cb) {
        cb(item)
      }
      return item
    })
  }

  function handleIndex(num) {
    let index = cardIndex + num
    let indexInArray = index >= 0 && index < currentDeck.cards.length
    setActiveCard(indexInArray ? index : 0)
  }

  function handleDeckChange(num) {
    let index = deckIndex + num
    let indexInArray = index >= 0 && index < cardData.length
    if (indexInArray) {
      changeDeck(_ => index)
    }
    if (index === -1) {
      changeDeck(0)
    }
  }

  function selectDeck(index) {
    setTimerCycle(false)
    changeDeck(index)
  }

  function selectCard(index) {
    setTimerCycle(false)
    setActiveCard(index)
  }

  function handleKeyPress(e) {
    if (e.code === 'Space') {
      toggleSide()
    }
    if (e.code === 'ArrowLeft') {
      handleIndex(-1)
    }
    if (e.code === 'ArrowRight') {
      handleIndex(1)
    }
    if (e.code === 'ArrowUp') {
      handleDeckChange(-1)
    }
    if (e.code === 'ArrowDown') {
      handleDeckChange(1)
    }
  }

  useEffect(() => {
    setCard(currentDeck.cards[cardIndex])
  }, [cardIndex])

  useEffect(() => {
    setDeck(cardData[deckIndex])
    setCard(cardData[deckIndex].cards[0])
    setActiveCard(0)
  }, [deckIndex])

  function possiblyAdvance(start, cb) {
    toggleSide(item => {
        if (item.side === 'front') {
          setActiveCard(c => {
            let withinBounds = c + 1 < currentDeck.cards.length
            if (withinBounds) {
              return c + 1
            } else {
              cb()
              return 0
            }
          })
        }
    })
  }

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        possiblyAdvance(start, () => {
          setActiveCard(0)
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
                <button className="Card-button Card-button-back" onClick={() => handleIndex(-1)}>&#x2190;</button>
                <button className="Card-button Card-button-advance" onClick={() => handleIndex(1)}>&#x2192;</button>
            </div>
            <Card
              key={currentCard.id}
              number={cardIndex + 1}
              onClick={() => toggleSide()} 
              advance={() => handleIndex(cardIndex + 1)}
              goBack={() => handleIndex(cardIndex - 1)}
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
