import { mathUtils } from "../MathUtils";
import { useGameState } from "../useGameState";
import { NumberButton } from "./NumberButton";
import { PlayAgain } from "./PlayAgain";
import { StarsDisplay } from "./StarsDisplay";

type GameProps = {
  startNewGame: any;
}

export const Game = (props: GameProps) => {

  // Reading values from CUSTOM HOOK
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  } = useGameState();

  // UI Logic computations based on States/Hooks
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
    
    // Updating states
    setGameState(newCandidateNums);
  }


  // Rendering UI based on current values of all states and computations
  return (
    <div className="star-match-game">
      <div className="help">
        Pick one or more numbers that sum to the number of stars
      </div>

      <div className="body">
        <div className="left">
          {
            gameStatus !== 'active' ? (
              <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
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