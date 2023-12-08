import Card from "./Card.jsx";

const Board = ({ cards, handleCardClick }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card key={card.id} cardData={card} handleClick={handleCardClick} />
      ))}
    </div>
  );
};

export default Board;
