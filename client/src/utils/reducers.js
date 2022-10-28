import { useReducer } from "react";
import {
  COMPLETE_GAME,
  CREATE_GAME,
  INCREMENT_MOVE_COUNT,
  SET_HIGH_SCORE,
  SET_OPTIONS,
  SHUFFLE_CARDS,
  UPDATE_INDEXES,
  FLIP_CARD,
  VERIFY_MATCH,
} from "./actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case COMPLETE_GAME: {
      const bestPossible = state.game.length;
      let multiplier;

      if (state.options === 16) {
        multiplier = 5;
      } else if (state.options === 36) {
        multiplier = 2.5;
      } else if (state.options === 64) {
        multiplier = 1;
      }

      const pointsLost = multiplier * (0.66 * state.moveCount - bestPossible);

      let score;
      if (pointsLost < 100) {
        score = 100 - pointsLost;
      } else {
        score = 0;
      }
      let highScore;

      if (score > state.highScore) {
        highScore = score;
        const json = JSON.stringify(score);
        localStorage.setItem("memorygamehighscore", json);
      }

      const newGame = window.confirm(
        "You Win!, SCORE: " + score + " New Game?"
      );

      let options;

      if (newGame) {
        const gameLength = state.game.length;
        options = gameLength;
        // setTimeout(() => {
        //   options = gameLength
        // }, 5);
      } else {
        options = null;
      }
      return {
        ...state,
        highScore,
        options,
      };
    }
    case CREATE_GAME: {
      const newGame = [];
      const importAll = (r) => r.keys().map((item) => r(item));

      const loadImages = importAll(
        require.context("../assets/images", false, /\.(png|jpe?g|svg)$/)
      );

      const colors = Array.from({ length: loadImages.length }, (_, i) => i + 1);

      for (let i = 0; i < state.options / 2; i++) {
        const coreOption = {
          colorId: i,
          color: colors[i],
          flipped: false,
        };
        const coreId = 2 * i;
        const firstOption = { ...coreOption, id: coreId };
        const secondOption = { ...coreOption, id: coreId + 1 };

        newGame.push(firstOption, secondOption);
      }

      const game = newGame.sort(() => Math.random() - 0.5);
      return { ...state, game };
    }
    case INCREMENT_MOVE_COUNT:
      return {
        ...state,
        moveCount: state.lastItemMoved !== payload ? state.moveCount + 1 : state.moveCount,
        lastItemMoved: payload
      };
    case FLIP_CARD:
      const cards = [...state.game];
      console.log("CARDS", cards);
      const currentCard = { ...cards[payload.id] };
      currentCard.flipped = !currentCard.flipped;
      cards[payload.id] = currentCard;
      return {
        ...state,
        game: cards,
      };
    case SET_HIGH_SCORE:
      return {
        ...state,
        highScore: payload,
      };
    case SHUFFLE_CARDS:
      return {
        ...state,
      };
    case UPDATE_INDEXES:
      return {
        ...state,
        flippedIndexes: payload,
      };
    case SET_OPTIONS:
      return {
        ...state,
        options: payload,
      };
    case VERIFY_MATCH: {
      let newIndexes;
      let newGame;
     
      const match =
        state.game[state.flippedIndexes[0]].colorId ===
        state.game[state.flippedIndexes[1]].colorId;

        
        if (match) {
        newGame = [...state.game];
        newGame[state.flippedIndexes[0]].flipped = true;
        newGame[state.flippedIndexes[1]].flipped = true;
        newIndexes = [...state.flippedIndexes, false];
      } else {
        newIndexes = [...state.flippedIndexes, true];
      }

      const updatedState = {
        ...state,
        flippedIndexes: newIndexes,
      };

      if (newGame) updatedState.game = newGame;

      return updatedState;
    }
    default:
      return state;
  }
};

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
}
