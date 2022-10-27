import { useEffect, useState } from "react";

import Card from "../Card";

function MemoryGame({ options, setOptions, highScore, setHighScore }) {
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  useEffect(() => {
    const newGame = [];
    const importAll = (r) => r.keys().map((item) => r(item));

    const loadImages = importAll(
      require.context("../../assets/images", false, /\.(png|jpe?g|svg)$/)
    );

    const colors = Array.from({ length: loadImages.length }, (_, i) => i + 1);

    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
  }, [options]);

  useEffect(() => {
    const finished = !game.some((card) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length;
        let multiplier;

        if (options === 12) {
          multiplier = 5;
        } else if (options === 18) {
          multiplier = 2.5;
        } else if (options === 24) {
          multiplier = 1;
        }

        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible);

        let score;
        if (pointsLost < 100) {
          score = 100 - pointsLost;
        } else {
          score = 0;
        }

        if (score > highScore) {
          setHighScore(score);
          const json = JSON.stringify(score);
          localStorage.setItem("memorygamehighscore", json);
        }

        const newGame = window.confirm(
          "You Win!, SCORE: " + score + " New Game?"
        );
        if (newGame) {
          const gameLength = game.length;
          setOptions(null);
          setTimeout(() => {
            setOptions(gameLength);
          }, 5);
        } else {
          setOptions(null);
        }
      }, 500);
    }
  }, [game, options, flippedCount, highScore, setHighScore, setOptions]);

  if (game.length === 0) return <div>loading...</div>;
  else {
    return (
      <div className="row m-5">
        <div id="cards" className="col-md-3">
          {game.map((card, index) => (
            <Card
              key={index}
              id={index}
              color={card.color}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          ))}
          <style jsx global>
            {`
              body {
                text-align: center;
                font-family: -apple-system, sans-serif;
              }
              .container {
                // width: 1060px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
              }
              button {
                background: #00ad9f;
                border-radius: 4px;
                font-weight: 700;
                color: #fff;
                border: none;
                padding: 7px 15px;
                margin-left: 8px;
                cursor: pointer;
              }
              button:hover {
                background: #008378;
              }
              button:focus {
                outline: 0;
              }
              #cards {
                // width: 1060px;
                margin: 0 auto;
                // display: flex;
                // flex-wrap: wrap;
                // position:absolute;
                display: grid;
                grid-template-columns: repeat(${Math.sqrt(options)}, auto);
                // grid-template-columns: repeat(auto-fill, auto);
                // grid-auto-rows: minmax(100px, auto);
                // width: 25%;
                // max-width: 50%;
                grid-gap: 5px;
                // overflow: hidden;
              }
            `}
          </style>
        </div>
      </div>
    );
  }
}

export default MemoryGame;
