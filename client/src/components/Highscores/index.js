import React from "react";

const Highscores = ({ highscores }) => {
  console.log("HIGHSCORES ARE HERE: ", highscores);
  if (!highscores) {
    return <h3>No Highscores Yet</h3>;
  }

  let newArray = [];
  highscores.map((highscore) => newArray.push(Math.floor(highscore)));
  newArray.sort((a, b) => a - b);
  newArray.reverse();
  newArray.length = 5;

  return (
    <div className="container">
      <div className="flex-row justify-space-between my-4">
        {newArray &&
          newArray.map((highscore, index) => (
            <div key={highscore} className="col-12">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  #{index + 1}: {highscore}
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Highscores;
