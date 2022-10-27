import React, { useEffect, useState } from "react";
import MemoryGame from "../MemoryGame";

export default function Match2Game() {
  const [options, setOptions] = useState(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const json = localStorage.getItem("memorygamehighscore");
    const savedScore = JSON.parse(json);
    if (savedScore) {
      setHighScore(savedScore);
    }
  }, []);

  return (
    <div>
      <div className="container">
        <h1>
          Memory Game
          <br />
        </h1>
        <div>
          High Score: {highScore}
          <br />
        </div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(16)}>Easy</button>
              <button onClick={() => setOptions(36)}>Medium</button>
              <button onClick={() => setOptions(64)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options;
                  setOptions(null);
                  setTimeout(() => {
                    setOptions(prevOptions);
                  }, 5);
                }}
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Choose a difficulty to begin!</h2>
      )}
    </div>
  );
}
