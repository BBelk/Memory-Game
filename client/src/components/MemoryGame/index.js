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
    const DoHighscore = async () => {
      console.log("DOING HIGHSCORE");
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
        dispatch({ type: COMPLETE_GAME });
        console.log("COMPLETED GAME");

        const newGame = window.confirm(
          "You Win!, SCORE: " + state.score + " New Game?"
        );
      } catch (e) {
        console.error(e);
      }
    };

    if (finished && state.game.length > 0 && state.inProgress) {
      DoHighscore();
      // setTimeout(() => {

      //   // console.log("ATTEMPTED TO ADD HIGHSCORE, ID: " + Auth.getProfile().data._id + " SCORE: " + state.score);
      // }, 300);
      // setTimeout(() => {
      //

      //   if (newGame) {
      //     dispatch({ type: CREATE_GAME });
      //   } else {
      //     dispatch({ type: SET_OPTIONS, payload: null });
      //   }
      // }, 400);
    }
  }, [dispatch, state.game, state.options]);

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
