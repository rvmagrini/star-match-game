import { useState } from "react";
import { mathUtils } from "../MathUtils";

export const StarMatchGame = () => {

  // State Elements: Data elements that are going to be used in the UI and get their values changed dynamically
  const [stars, setStars] = useState(mathUtils.random(1,9));

    return (
      <div className="star-match-game">
        <div className="help">
          Pick one or more numbers that sum to the number of stars
        </div>

        <div className="body">
          <div className="left">
            {mathUtils.range(1, stars).map(starId => 
            <div key={starId} className="star"></div> 
            )}
          </div>

          <div className="right">
            {mathUtils.range(1, 9).map(number =>
              <button key={number} className="number">{number}</button>
              )}
          </div>
        </div>

        <div className="timer">Time Remaining: <strong>10</strong></div>
      </div>
    );
  };