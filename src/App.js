import React, { useState, useEffect } from 'react';
import { themeProvider, ThemeProvider } from './ThemeContext';
import './App.css';
import Card from './Card';
import Page from './Page';
import cardData from './seed';
import DeckNav from './DeckNav';

function App() {
  const [cardIndex, setActiveCardByIndex] = useState(0)
  const [deckIndex, changeDeck] = useState(0)
  const [cardGroup, setCardGroup] = useState(cardData)
  const [currentDeck, setDeck] = useState(cardGroup[deckIndex])
  const [currentCard, setCard] = useState(currentDeck.cards[cardIndex])
  const [timerRunning, setTimerCycle] = useState(false)
  const [timeCycle, setTime] = useState(3000)
  const [start, setStart] = useState(true)
  const [activeTheme, setTheme] = useState(getTheme())

  function getTheme() {
    return localStorage.getItem('theme') || 'light-mode'
  }

  function toggleTheme() {
    setTheme(v => {
      const newTheme = v === 'dark-mode' ? 'light-mode' : 'dark-mode'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  function handleToggleSide(cb) {
    setCard(currentCard => {
      let item = {...currentCard, side: currentCard.side === 'front' ? 'back' : 'front'}
      if (cb) {
        cb(item)
      }
      return item
    })
  }

  function handleCardIndexChange(num, limit, cb) {
    setActiveCardByIndex(currIndex => {
      if (currIndex + num === limit) {
        cb()
      }
      return currIndex + num
    })
  }

  function handleDeckChange(num) {
    changeDeck(i => i + num)
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
    e.preventDefault()
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

  function cycleDeck(index) {
    changeDeck(() => {
      setTimerCycle(true)
      return index
    })
  }

  function pauseCycleDeck(index) {
    setTimerCycle(false)
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
    const offset = deckIndex
    let index = 0
    if (offset < 0) {
      index = 0
    } else if (offset > 0 && offset >= cardGroup.length) {
      index = offset - 1
    } else if (offset > 0 && offset < cardGroup.length) {
      index = offset
    }
    setDeck(cardGroup[index])
    setActiveCardByIndex(0)
    changeDeck(index)
  }, [deckIndex, cardGroup])

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        handleToggleSide(v => {
          if (v.side === 'front' && !start) {
            handleCardIndexChange(1, currentDeck.cards.length, () => {
              setTimerCycle(false)
              setActiveCardByIndex(0)
            })
          } else {
            setStart(false)
          }
        })
      }, timeCycle);
    } else if (!timerRunning) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning, start, currentDeck, timeCycle])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [])
  return (
    <ThemeProvider value={activeTheme}>
    <Page>
      <label className="theme-toggler switch">
        <input type="checkbox" onChange={toggleTheme} checked={activeTheme === 'dark-mode'}/>
        <span className="slider round"></span>
      </label>
      {/* <button className="Card-button Card-cycle-button" onClick={() => cycleDeck(currentDeck)}><span>Cycle deck</span> &#8634;</button> */}
      <div className="Dash">
        <div>
          <DeckNav 
            currentId={currentCard.id}
            active={currentDeck.title}
            decks={cardGroup}
            playing={timerRunning}
            cycleDeck={cycleDeck}
            pauseCycleDeck={pauseCycleDeck}
            selectCard={selectCard}
            selectDeck={selectDeck} />
        </div>
        <div className="Card-container">
          <div className="Card-container-inner">
            {
              !timerRunning &&
              <div className="Card-actions-app">
                <button className="Card-button Card-button-back" onClick={() => handleCardIndexChange(-1)}>&#x2190;</button>
                <button className="Card-button Card-button-advance" onClick={() => handleCardIndexChange(1)}>&#x2192;</button>
              </div>
            }
            <Card
              key={currentCard.id}
              number={cardIndex + 1}
              onClick={() => handleToggleSide()} 
              advance={() => handleCardIndexChange(1)}
              goBack={() => handleCardIndexChange(-1)}
              front={currentCard.front} 
              back={currentCard.back} 
              side={currentCard.side}
              showArrows={!timerRunning}
              language={currentCard.language} 
            />
          </div>
        </div>
      </div>
    </Page>
  </ThemeProvider>
  );
}

export default App;
