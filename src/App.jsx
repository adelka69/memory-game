import Card from "./components/Card";

function App() {
  const handleClick = (id) => {
    console.log(`Clicked card with ID: ${id}`);
  };

  const cardData = {
    id: 1,
    src: "/public/jay.png",
    matched: false,
  };

  return (
    <div className="App">
      <h1>Test de composant Card</h1>
      <Card cardData={cardData} handleClick={handleClick} />
    </div>
  );
}

export default App;
