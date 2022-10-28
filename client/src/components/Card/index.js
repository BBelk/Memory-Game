import React, { useState, useEffect } from "react";
import StyledCard from "./StyledCard";
import { useSpring, animated as a } from "react-spring";

function Card({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) {

  
  const backgroundColors = [
    "#e8cefc",
    "#fcd1ce",
    "#e2fcce",
    "#cef9fc",
    "#fce8cf",
    "#cffcd2",
    "#fccff9",
    "#cfe3fc"
  ];
let myColorIndex = color;
  while(myColorIndex > 7){
    myColorIndex -= 8;
  }
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        setFlipped((state) => !state);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
      }, 1000);
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount((flippedCount) => flippedCount + 1);
      setFlippedIndexes([]);
    }
  }, [id, flippedIndexes, setFlipped, setFlippedCount, setFlippedIndexes]);

  const importAll = (r) => r.keys().map((item) => r(item));

  const loadImages = importAll(
    require.context("../../assets/images", false, /\.(png|jpe?g|svg)$/)
  );

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      // If it's not flipped and fippedCount is evenly divisible by 3 Got a match and another turn to come up
      setFlipped((state) => !state);
      setFlippedCount((flippedCount) => flippedCount + 1);
      const newIndexes = [...flippedIndexes, id];
      setFlippedIndexes(newIndexes);
    } else if (
      !game[id].flipped &&
      flippedCount % 3 === 1 &&
      flippedIndexes.indexOf(id) < 0
    ) {
      // If you don't get a match
      setFlipped((state) => !state);
      setFlippedCount((flippedCount) => flippedCount + 1);
      const newIndexes = [...flippedIndexes, id];
      setFlippedIndexes(newIndexes);
    }
  };

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
