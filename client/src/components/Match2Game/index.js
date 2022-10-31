import React, { useEffect } from "react";
import MemoryGame from "../MemoryGame";
import { useGameStore } from "../../utils/store";
import {
  CREATE_GAME,
  SET_HIGH_SCORE,
  SET_LAST_SCORE,
  SET_OPTIONS,
} from "../../utils/actions";

export default function Match2Game() {
  const [state, dispatch] = useGameStore();

  useEffect(() => {
    const json = localStorage.getItem("memorygamehighscore");
    const savedScore = JSON.parse(json);
    if (savedScore) {
      dispatch({ type: SET_HIGH_SCORE, payload: savedScore });
    }
  }, [dispatch]);

  useEffect(() => {
    const json = localStorage.getItem("memorygamelastscore");
    const savedScore = JSON.parse(json);
    if (savedScore) {
      dispatch({ type: SET_LAST_SCORE, payload: savedScore });
    }
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <div>
          High Score: {state.highScore}
          <br />
        </div>
        <div>
          {state.options === null ? (
            <>
              <button
                onClick={() => dispatch({ type: SET_OPTIONS, payload: 4 })}
              >
                Super Easy Test
              </button>
              <button
                onClick={() => dispatch({ type: SET_OPTIONS, payload: 16 })}
              >
                Easy
              </button>
              <button
                onClick={() => dispatch({ type: SET_OPTIONS, payload: 36 })}
              >
                Medium
              </button>
              <button
                onClick={() => dispatch({ type: SET_OPTIONS, payload: 64 })}
              >
                Hard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  dispatch({ type: CREATE_GAME });
                }}
              >
                Start Over
              </button>
              <button
                onClick={() => dispatch({ type: SET_OPTIONS, payload: null })}
              >
                Main Menu
              </button>
            </>
          )}
        </div>
      </div>

      {state.options ? <MemoryGame /> : <h2>Choose a difficulty to begin!</h2>}
    </div>
  );
}
