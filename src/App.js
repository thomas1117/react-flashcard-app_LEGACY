import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import cardData from './seed';
import DeckNav from './DeckNav';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );

  useEffect(
    () => {
      const handler = (...args) => savedCallback.current(...args);

      if (delay !== null) {
        const id = setInterval(handler, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
};

function App() {
  const [cardIndex, setIndex] = useState(0)
  const [deckIndex, setDeckIndex] = useState(0)
  const [currentDeck, setDeck] = useState(cardData[deckIndex])
  const [currentCard, setCard] = useState(currentDeck.cards[cardIndex])

  function toggleSide() {
    let item = {...currentCard}
    item.side = item.side === 'front' ? 'back' : 'front'
    setCard(item)
  }
  function handleIndex(index) {
    if (index >= 0 && index < currentDeck.cards.length) {
      setIndex(index)
      setCard(currentDeck.cards[index])
    } else {
      // always reset to 0...
      setIndex(0)
      setCard(currentDeck.cards[0])
    }
  }
  function selectDeck(index) {
    setDeckIndex(index)
    setDeck(cardData[index])
    setCard(cardData[index].cards[0])
    setIndex(0)
  }
  function cycleDeck() {
    // useInterval(toggleSide, 1000)
    // toggleSide()
  }
  return (
    <div className="App">
      <button className="Card-button Card-cycle-button" onClick={cycleDeck}><span>Cycle deck</span> &#8634;</button>
      <div className="Dash">
        <div>
          <DeckNav active={currentDeck.title} decks={cardData} selectDeck={selectDeck} />
        </div>
        <div className="Card-container">
          <div className="Card-container-inner">
            <div className="Card-actions-app">
                <button className="Card-button Card-button-back" onClick={() => handleIndex(cardIndex - 1)}>&#x2190;</button>
                <button className="Card-button Card-button-advance" onClick={() => handleIndex(cardIndex + 1)}>&#x2192;</button>
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
