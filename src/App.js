import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import cardData from './seed';

function App() {
  const [cardIndex, setIndex] = useState(0)
  const [deckIndex, setDeckIndex] = useState(0)
  const [currentCard, setCard] = useState(cardData[deckIndex].cards[cardIndex])
  function toggleSide() {
    let item = {...currentCard}
    item.side = item.side === 'front' ? 'back' : 'front'
    setCard(item)
  }
  function handleIndex(index) {
    if (index >= 0) {
      setIndex(index)
      setCard(cardData[deckIndex].cards[index])
    }
  }
  return (
    <div className="App">
      <Card
        key={currentCard.id}
        onClick={() => toggleSide()} 
        advance={() => handleIndex(cardIndex + 1)}
        goBack={() => handleIndex(cardIndex - 1)}
        front={currentCard.front} 
        back={currentCard.back} 
        side={currentCard.side} 
        language={currentCard.language} 
      />
    </div>
  );
}

export default App;
