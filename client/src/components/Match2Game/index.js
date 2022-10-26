import React, { useEffect, useState } from "react";
import Images from "../../assets/images/back.png";

import { useSpring, animated as a } from "react-spring";

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

function MemoryGame({ options, setOptions, highScore, setHighScore }) {
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const colors = [
    "#ecdb54",
    "#e34132",
    "#6ca0dc",
    "#944743",
    "#dbb2d1",
    "#ec9787",
    "#00a68c",
    "#645394",
    "#6c4f3d",
    "#ebe1df",
    "#bc6ca7",
    "#bfd833",
  ];

  useEffect(() => {
    const newGame = [];
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
  }, []);

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
  }, [game]);

  if (flippedIndexes.length === 2) {
    if (flippedIndexes.length === 2) {
      const match =
        game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId;

      if (match) {
        const newGame = [...game];
        newGame[flippedIndexes[0]].flipped = true;
        newGame[flippedIndexes[1]].flipped = true;
        setGame(newGame);

        const newIndexes = [...flippedIndexes];
        newIndexes.push(false);
        setFlippedIndexes(newIndexes);
      } else {
        const newIndexes = [...flippedIndexes];
        newIndexes.push(true);
        setFlippedIndexes(newIndexes);
      }
    }
  }

  if (game.length === 0) return <div>loading...</div>;
  else {
    return (
      //       <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
      //       ${items.map(item => `
      //           <div class="card">
      //               <div class="card-front"></div>
      //               <div class="card-back">${item}</div>
      //           </div>
      //       `).join('')}
      //  </div>
      // <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)"></div>
      <div className="row m-5">
        <div id="cards" className="col-md-3">
          {game.map((card, index) => (
            <div className="card" key={index}>
              <Card
                id={index}
                color={card.color}
                game={game}
                flippedCount={flippedCount}
                setFlippedCount={setFlippedCount}
                flippedIndexes={flippedIndexes}
                setFlippedIndexes={setFlippedIndexes}
              />
            </div>
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
              .card {
                // width: 160px;
                // height: 160px;
                // margin-bottom: 20px;
                // position: relative;
                // display:flex;
                width: 1fr;
                height: 1fr;
                aspect-ratio: 1;
                // cursor: pointer;
              }
              .card:not(:nth-child(6n)) {
                // margin-right: 20px;
              }

              .c {
                // position: absolute;
                // max-width: 160px;
                // max-height: 160px;
                // width: 50ch;
                // height: 50ch;
                cursor: pointer;
                will-change: transform, opacity;
              }

              .front,
              .back {
                background-size: cover;
                position: absolute;
                border-radius: 5px;
                width: 100%;
                height: 100%;
                // background: #282A3A;
                // transition: transform .6s cubic-bezier(0.4, 0.0, 0.2, 1);
                // backface-visibility: hidden;
              }

              .back {
                background-image: url("${Images}");
              }

              .front {
                background-image: url(https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop);
              }
            `}
          </style>
        </div>
      </div>
    );
  }
}

function Card({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set((state) => !state);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
      }, 1000);
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([]);
    }
  }, [flippedIndexes]);

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      set((state) => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      set((state) => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    }
  };

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate((o) => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          background: color,
        }}
      />
    </div>
  );
}
