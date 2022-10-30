import { useEffect } from "react";

import Card from "../Card";
import { useGameStore } from "../../utils/store";
import { COMPLETE_GAME, CREATE_GAME, VERIFY_MATCH } from "../../utils/actions";
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_HIGHSCORE } from '../../utils/mutations';

// const AddToHighScore = async (newScore) => {
  //       // add score
  //       console.log("ATTEMPTED TO ADD HIGHSCORE, ID: " + Auth.getProfile().data._id + " SCORE: " + newScore);
  //       addHighscore({
    //         profileId: Auth.getProfile().data._id,
    //         newHighscore: newScore
    //       });
    // }
    
    
    function MemoryGame() {
  // const [addHighscore] = useMutation(ADD_HIGHSCORE);
  const [state, dispatch] = useGameStore();
  const [addHighscore, { error, data }] = useMutation(ADD_HIGHSCORE);

  useEffect(() => {
    dispatch({type: CREATE_GAME})
  }, [dispatch]);

  useEffect(() => { 
    if (state.flippedIndexes.length === 2) {
      dispatch({type: VERIFY_MATCH})
    }
  }, [dispatch, state.flippedIndexes.length]);

  useEffect(() => {
    const finished = !state.game.some((card) => !card.flipped);
    if (finished && state.game.length > 0) {
      dispatch({type: COMPLETE_GAME})
      // setTimeout(() => {
        
        console.log("ATTEMPTED TO ADD HIGHSCORE, ID: " + Auth.getProfile().data._id + " SCORE: " + state.highScore);
        
      DoHighscore();
      // }, 500);
    }
  }, [dispatch, state.game, state.options, state.moveCount, state.highScore]);

  const DoHighscore = async() => {
    try {
      let scoreString = "" + state.highScore;
      const { data } = await addHighscore({
        variables: { profileId: Auth.getProfile().data._id,
          newHighscore: scoreString},
      });

      // Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  }

  if (state.game.length === 0) return <div>loading...</div>;
  else {
    return (
      <div className="row m-5">
        <div id="cards" className="col-md-3">
          {state.game.map((card, index) => (
            <Card
              key={index}
              id={index}
              color={card.color}
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
                grid-template-columns: repeat(${Math.sqrt(state.options)}, auto);
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
