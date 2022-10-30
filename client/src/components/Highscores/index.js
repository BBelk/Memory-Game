import React from 'react';

const Highscores = ({ highscores }) => {
  console.log("HIGHSCORES ARE HERE: ", highscores);
  if (!highscores) {
    return <h3>No Highscores Yet</h3>;
  }

  return (
    <div className="container">
      <div className="flex-row justify-space-between my-4">
        <h3>Your HighScores</h3>
        {highscores &&
          highscores.map((highscore) => (
            <div key={highscore} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {highscore} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Highscores