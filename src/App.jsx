import { useState } from "react";
import Card from "./components/Card";

function App() {
  const cardImages = [
    { src: "/public/cole.webp", matched: false },
    { src: "/public/jay.png", matched: false },
    { src: "/public/kai.webp", matched: false },
    { src: "/public/Lloyd.webp", matched: false },
    { src: "/public/MaitreWu.png", matched: false },
    { src: "/public/Zane.webp", matched: false },
  ];

  return (
    <div className="App">
      <h1>Wildy Match</h1>
      <button type="button">New game</button>
      <div className="card-grid">
        {cardImages.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
