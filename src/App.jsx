import { useEffect, useState } from "react";
import Card from "./components/Card";
import Bingo from "./components/Bingo";
import "./App.css";

const cardImages = [
  { src: "/public/cole.webp", matched: false },
  { src: "/public/jay.png", matched: false },
  { src: "/public/kai.webp", matched: false },
  { src: "/public/Lloyd.webp", matched: false },
  { src: "/public/MaitreWu.png", matched: false },
  { src: "/public/Zane.webp", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameResolved, setIsGameResolved] = useState(false);

  // Ajoutez une fonction pour vérifier si toutes les cartes sont appariées
  const areAllCardsMatched = () => {
    return cards.every((card) => card.matched);
  };

  // Ajoutez une fonction pour gérer l'action une fois que toutes les cartes sont trouvées
  const handleAllCardsMatched = () => {
    setIsGameResolved(true);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setIsGameResolved(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => resetTurn(), 1000);
        if (areAllCardsMatched()) {
          handleAllCardsMatched();
        }
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, areAllCardsMatched]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Wildy Match</h1>
      <button onClick={shuffleCards}>New game</button>
      <p>Turns: {turns}</p>
      {isGameResolved ? (
        <Bingo />
      ) : (
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
