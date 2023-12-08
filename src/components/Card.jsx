const Card = ({ cardData, handleClick }) => {
  const { id, src, matched } = cardData;

  const handleClickCard = () => {
    if (!matched) {
      handleClick(id);
    }
  };

  return (
    <div
      className={`card ${matched ? "matched" : ""}`}
      onClick={handleClickCard}
    >
      <img src={src} alt={`Card ${id}`} />
    </div>
  );
};

export default Card;
