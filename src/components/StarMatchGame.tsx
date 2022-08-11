import { useState } from "react";
import { mathUtils } from "../MathUtils";
import { NumberButton } from "./NumberButton";
import { StarsDisplay } from "./StarsDisplay";

export const StarMatchGame = () => {

  // State Elements: Data elements that are going to be used in the UI and get their values changed dynamically
  const [stars, setStars] = useState(mathUtils.random(1, 9));

  // Mocked state values to test UI
  const [availableNums, setAvailableNums] = useState([1, 2, 3, 4, 5]);
  const [candidateNums, setCandidateNums] = useState([2, 3]);

  const candidatesAreWrong = mathUtils.sum(candidateNums) > stars;

  const numberStatus = (number: number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }


  return (
    <div className="star-match-game">
      <div className="help">
        Pick one or more numbers that sum to the number of stars
      </div>

      <div className="body">
        <div className="left">
          <StarsDisplay amount={stars} />
        </div>

        <div className="right">
          {mathUtils.range(1, 9).map(number =>
            <NumberButton
              key={number}
              number={number}
              status={numberStatus(number)}
            />
          )}
        </div>
      </div>

      <div className="timer">Time Remaining: <strong>10</strong></div>
    </div>
  );
};