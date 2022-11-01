// OUTSIDE
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useSpring, animated as a } from "react-spring";
// INSIDE
import StyledCard from "./StyledCard";
import Auth from "../../utils/auth";
import { useGameStore } from "../../utils/store";
import {
  COMPLETE_GAME,
  FLIP_CARD,
  INCREMENT_MOVE_COUNT,
  UPDATE_INDEXES,
} from "../../utils/actions";
import { ADD_HIGHSCORE } from "../../utils/mutations";

function Card({ id, color }) {
  const [state, dispatch] = useGameStore();
  const [addHighscore, { error }] = useMutation(ADD_HIGHSCORE);

  const backgroundColors = [
    "#e8cefc",
    "#fcd1ce",
    "#e2fcce",
    "#cef9fc",
    "#fce8cf",
    "#cffcd2",
    "#fccff9",
    "#cfe3fc",
  ];
  let myColorIndex = color;
  while (myColorIndex > 7) {
    myColorIndex -= 8;
  }

  const { transform, opacity } = useSpring({
    opacity: state.game[id].flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${
      state.game[id].flipped ? 180 : 0
    }deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    onRest: async () => {
      const finished = !state.game.some((card) => !card.flipped);
      if (finished && state.game.length > 0 && state.inProgress) {
        dispatch({ type: COMPLETE_GAME });
      }
    },
  });

  useEffect(() => {
    if (
      state.flippedIndexes[2] === true &&
      state.flippedIndexes.indexOf(id) > -1
    ) {
      setTimeout(() => {
        dispatch({ type: FLIP_CARD, payload: { id, color } });
        dispatch({ type: INCREMENT_MOVE_COUNT, payload: id });
        dispatch({ type: UPDATE_INDEXES, payload: [] });
      }, 1000);
    } else if (state.flippedIndexes[2] === false && id === 0) {
      dispatch({ type: UPDATE_INDEXES, payload: [] });
      dispatch({ type: INCREMENT_MOVE_COUNT });
    }
  }, [id, color, dispatch, state.flippedIndexes]);

  const importAll = (r) => r.keys().map((item) => r(item));

  const loadImages = importAll(
    require.context("../../assets/images", false, /\.(png|jpe?g|svg)$/)
  );

  const onCardClick = () => {
    if (!state.game[id].flipped && state.moveCount % 3 === 0) {
      // If it's not flipped and fippedCount is evenly divisible by 3 Got a match and another turn to come up
      dispatch({ type: FLIP_CARD, payload: { id, color } });
      dispatch({ type: INCREMENT_MOVE_COUNT });
      const newIndexes = [...state.flippedIndexes, id];
      dispatch({ type: UPDATE_INDEXES, payload: newIndexes });
    } else if (
      !state.game[id].flipped &&
      state.moveCount % 3 === 1 &&
      state.flippedIndexes.indexOf(id) < 0
    ) {
      // If you don't get a match
      dispatch({ type: FLIP_CARD, payload: { id, color } });
      dispatch({ type: INCREMENT_MOVE_COUNT });
      const newIndexes = [...state.flippedIndexes, id];
      dispatch({ type: UPDATE_INDEXES, payload: newIndexes });
    }
  };

  if (error) {
    console.log("ERROR", error);
  }

  return (
    <StyledCard onClick={onCardClick}>
      <div className="card">
        <a.div
          className="c back"
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform,
            backgroundImage: `url(${loadImages[0].default})`,
          }}
        />
        <a.div
          className="c front"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
            backgroundColor: backgroundColors[myColorIndex],
            backgroundImage: `url(${loadImages[color].default})`,
          }}
        />
      </div>
    </StyledCard>
  );
}

export default Card;
