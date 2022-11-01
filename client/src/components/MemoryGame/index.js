import { useEffect } from "react";

import Card from "../Card";
import { useGameStore } from "../../utils/store";
import {
  COMPLETE_GAME,
  CREATE_GAME,
  SET_OPTIONS,
  VERIFY_MATCH,
} from "../../utils/actions";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_HIGHSCORE } from "../../utils/mutations";

function MemoryGame() {
  // const [addHighscore] = useMutation(ADD_HIGHSCORE);
  const [state, dispatch] = useGameStore();
  const [addHighscore, { error, data }] = useMutation(ADD_HIGHSCORE);

  useEffect(() => {
    dispatch({ type: CREATE_GAME });
  }, [dispatch]);

  useEffect(() => {
    if (state.flippedIndexes.length === 2) {
      dispatch({ type: VERIFY_MATCH });
    }
  }, [dispatch, state.flippedIndexes.length]);

  useEffect(() => {
    const finished = !state.game.some((card) => !card.flipped);
    console.log("FINISHED", finished);
    console.log("LENGTH", state.game.length);
    if (state.game.length && finished && !state.inProgress && state.moveCount) {
      const doHighscore = async () => {
        try {
          let scoreString = "" + state.score;
          if (Auth.loggedIn()) {
            const { data } = await addHighscore({
              variables: {
                profileId: Auth.getProfile().data._id,
                newHighscore: scoreString,
              },
            });
          }

          const playNewGame = window.confirm(
            "You Win!, SCORE: " + scoreString + " New Game?"
          );

          playNewGame
            ? dispatch({ type: CREATE_GAME })
            : dispatch({ type: SET_OPTIONS, payload: null });
        } catch (e) {
          console.error(e);
        }
      };
      doHighscore();
    }
  }, [dispatch, state.score]);

  if (state.game.length === 0) return <div>loading...</div>;
  else {
    return (
      <div className="row mt-2 m-5">
        <div
          id="cards"
          className="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-4"
        >
          {state.game.map((card, index) => (
            <Card key={index} id={index} color={card.color} />
          ))}
          <style>
            {`
              #cards {
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(
                  ${Math.sqrt(state.options)},
                  auto
                );
                grid-gap: 5px;
              }
            `}
          </style>
        </div>
      </div>
    );
  }
}

export default MemoryGame;
