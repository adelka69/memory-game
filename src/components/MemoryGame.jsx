import { useEffect, useState } from "react";
import Card from "./Card";
import Bingo from "./Bingo";
import "./MemoryGame.css";

import cole from "../../public/cole.webp";
import jay from "../../public/jay.png";
import kai from "../../public/kai.webp";
import Lloyd from "../../public/Lloyd.webp";
import MaitreWu from "../../public/MaitreWu.png";
import Zane from "../../public/Zane.webp";

const cardImages = [
  { src: cole, matched: false },
  { src: jay, matched: false },
  { src: kai, matched: false },
  { src: Lloyd, matched: false },
  { src: MaitreWu, matched: false },
  { src: Zane, matched: false },
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isGameResolved, setIsGameResolved] = useState(false);

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
    const areAllCardsMatched = () => {
      return cards.every((card) => card.matched);
    };
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
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    if (areAllCardsMatched()) {
      handleAllCardsMatched();
    }
  }, [choiceOne, choiceTwo]);

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
      <div className="title">Wildy Match</div>
      <div className="gameNav">
        <button onClick={shuffleCards}>New game</button>
        <p>Turns: {turns}</p>
      </div>
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

export default MemoryGame;
