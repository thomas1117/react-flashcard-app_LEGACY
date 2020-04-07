import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import cardData from './seed';

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
    }
  }
  return (
    <div className="App">
      <div className="Card-container">
        {/* <h2 className="Card-container-title">{currentDeck.title}</h2> */}
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
  );
}

export default App;
