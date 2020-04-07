import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';
import cardData from './seed';

function App() {
  const [cards, setCards] = useState(cardData[0].cards)
  function handleClick(index) {
    let newCards = [...cards].map((item, i) => {
      if (i === index) {
        item.side = item.side === 'front' ? 'back' : 'front'
      }
      return item
    })
    setCards(newCards)
  }

  return (
    <div className="App">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            onClick={() => handleClick(index)} 
            front={card.front} 
            back={card.back} 
            side={card.side} 
            language={card.language} 
          />
        )
      })}
    </div>
  );
}

export default App;
