function GameOver({ result, onRestart }) {
  return (
    <section className="container">
      <h1>Game Over!</h1>
      <h3>{result}</h3>
      <button onClick={onRestart}>NEW GAME</button>
    </section>
  );
}

export default GameOver;