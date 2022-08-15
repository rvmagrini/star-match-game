import { useState, useEffect } from "react";
import { mathUtils } from "./MathUtils";

// CUSTOM HOOK: special stateful function that groups and manages hooks
// Depends on: availableNums, candidateNums, gameStatus, stars, secondsLeft and numberStatus()
export const useGameState = () => {

    // Managing State
    // STATE HOOKS (State Elements): Data elements that are going to be used in the UI and get their values changed dynamically
    const [stars, setStars] = useState(mathUtils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(mathUtils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState<number[]>([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    // Managing Effects
    // EFFECT HOOKS: introduce side effect to this component (triggered every time this component is done rendering)
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
    });

    // Managing State Transactions
    const setGameState = (newCandidateNums: number[]) => {
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


    return {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState
    };
}