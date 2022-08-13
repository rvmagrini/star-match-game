import { useState, useEffect } from "react";
import { mathUtils } from "../MathUtils";
import { NumberButton } from "./NumberButton";
import { PlayAgain } from "./PlayAgain";
import { StarsDisplay } from "./StarsDisplay";

export const StarMatchGame = () => {

  // USE STATE HOOKS (State Elements): Data elements that are going to be used in the UI and get their values changed dynamically
  const [stars, setStars] = useState(mathUtils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(mathUtils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  // USE EFFECT HOOKS: introduce side effect to this component (triggered every time this component is done rendering)
  useEffect(() => {
    console.log('Done rendering');

    if (secondsLeft > 0 && availableNums.length > 0) {
      // Introduce new timer that changes state of secondsLeft
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, 1000);
      return () => {
        console.log('Component is going to re-render');
        // Remove previous timer: effects should always be cleaned after taking place
        clearTimeout(timerId);
      }
    }
  })

  // UI Logic computations based on states/hooks
  const candidatesAreWrong = mathUtils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won'
  : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number: number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }

  // Transactions Logic for click handlers
  const onNumberClick = (number: number, currentStatus: string) => {
    if (currentStatus === 'used' || gameStatus !== 'active') {
      return;
    }
    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(n => n !== number);
    if (mathUtils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(mathUtils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }

  // Reset all states and side effects
  const resetGame = () => {
    setStars(mathUtils.random(1, 9));
    setAvailableNums(mathUtils.range(1, 9));
    setCandidateNums([]);
    setSecondsLeft(10);
  }

  // Description of UI based on all states and computations
  return (
    <div className="star-match-game">
      <div className="help">
        Pick one or more numbers that sum to the number of stars
      </div>

      <div className="body">
        <div className="left">
          {
            gameStatus !== 'active' ? (
              <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
            ) : (
              <StarsDisplay amount={stars} />
            )
          }
        </div>

        <div className="right">
          {mathUtils.range(1, 9).map(number =>
            <NumberButton
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          )}
        </div>
      </div>

      <div className="timer">Time Remaining: <strong>{secondsLeft}</strong></div>
    </div>
  );
};