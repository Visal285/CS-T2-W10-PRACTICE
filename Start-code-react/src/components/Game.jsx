import React, { useState } from "react";
import GameOver from "./GameOver.jsx";
import Entity from "./Entity.jsx";
import Log from "./Log.jsx";


// ----------------------------------------------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------------------------------------------
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLogAttack(isPlayer, damage) {
  return {
    isPlayer,
    isDamage: true,
    text: `takes ${damage} damage`,
  };
}

function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: `heals ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATE
  // ----------------------------------------------------------------------------------------------------------
  const [playerHp, setPlayerHp] = useState(100);
  const [monsterHp, setMonsterHp] = useState(100);
  const [currentRound, setCurrentRound] = useState(0);
  const [logs, setLogs] = useState([]);

  // ----------------------------------------------------------------------------------------------------------
  // CONDITIONS
  // ----------------------------------------------------------------------------------------------------------
  const canUseSpecial = currentRound % 3 === 0;

  // ----------------------------------------------------------------------------------------------------------
  // MONSTER ATTACK
  // ----------------------------------------------------------------------------------------------------------
  const monsterAttack = () => {
    const damage = getRandomValue(6, 14);
    setPlayerHp((prev) => Math.max(prev - damage, 0));

    setLogs((prev) => [
      createLogAttack(true, damage),
      ...prev,
    ]);
  };

  // ----------------------------------------------------------------------------------------------------------
  // ACTIONS
  // ----------------------------------------------------------------------------------------------------------
  const handleAttack = () => {
    const damage = getRandomValue(5, 12);
    setMonsterHp((prev) => Math.max(prev - damage, 0));

    setLogs((prev) => [
      createLogAttack(false, damage),
      ...prev,
    ]);

    monsterAttack();
    setCurrentRound((prev) => prev + 1);
  };

  const handleSpecialAttack = () => {
    const damage = getRandomValue(10, 25);
    setMonsterHp((prev) => Math.max(prev - damage, 0));

    setLogs((prev) => [
      createLogAttack(false, damage),
      ...prev,
    ]);

    monsterAttack();
    setCurrentRound((prev) => prev + 1);
  };

  const handleHeal = () => {
    const heal = getRandomValue(8, 15);
    setPlayerHp((prev) => Math.min(prev + heal, 100));

    setLogs((prev) => [ 
      createLogHeal(heal),
      ...prev,
    ]);

    monsterAttack();
    setCurrentRound((prev) => prev + 1);
  };

  const handleSurrender = () => {
    setPlayerHp(0);
  };

  // ----------------------------------------------------------------------------------------------------------
  // NEW GAME
  // ----------------------------------------------------------------------------------------------------------
  const handleNewGame = () => {
    setPlayerHp(100);
    setMonsterHp(100);
    setCurrentRound(0);
    setLogs([]);
  };

  // ----------------------------------------------------------------------------------------------------------
  // RESULT LOGIC
  // ----------------------------------------------------------------------------------------------------------
  let result = "";
  if (monsterHp <= 0 && playerHp <= 0) {
    result = "It's a draw!";
  } else if (monsterHp <= 0) {
    result = "Player has won!";
  } else if (playerHp <= 0) {
    result = "Monster has won!";
  }

  // ----------------------------------------------------------------------------------------------------------
  // UI
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      {/* Game Over */}
      {result && (
        <GameOver result={result} onRestart={handleNewGame} />
      )}

      {/* Entities */}
      <Entity name="Monster" hp={monsterHp} />
      <Entity name="Player" hp={playerHp} />

      {/* Controls */}
      {!result && (
        <section className="container">
          <button onClick={handleAttack}>ATTACK</button>
          <button onClick={handleSpecialAttack} disabled={!canUseSpecial}>
            SPECIAL !
          </button>
          <button onClick={handleHeal}>HEAL</button>
          <button onClick={handleSurrender}>KILL YOURSELF</button>
        </section>
      )}

      {/* Logs */}
      <Log logs={logs} />
    </>
  );
}

export default Game;