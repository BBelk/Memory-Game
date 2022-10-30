import React, { createContext, useContext } from "react";
import { useGameReducer } from './reducers';

const GameStore = createContext();
const { Provider } = GameStore;

export const useGameStore = () => useContext(GameStore);

export default function StoreProvider(props) {
  const reducer = useGameReducer({
    game: [],
    moveCount: 0,
    flippedIndexes: [],
    highScore: 0,
    score: 0,
    options: null,
    lastItemMoved: -1
  });
  return <Provider value={reducer} {...props} />
}