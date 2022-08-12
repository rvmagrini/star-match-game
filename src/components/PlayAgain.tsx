type PlayAgainProps = {
    onClick: any;
    gameStatus: string;
}

export const PlayAgain = (props: PlayAgainProps) => {

    return (
        <>
            <div className="game-done">
                <div
                    className="message"
                    style={{
                        color: props.gameStatus === 'lost'
                            ? '#F87474'
                            : '#53BF9D'
                    }}>
                    {props.gameStatus === 'lost'
                        ? 'GAME OVER'
                        : 'YOU WON'}
                </div>

                <button
                    className="play-again"
                    onClick={props.onClick}>
                    PLAY AGAIN
                </button>
            </div>
        </>
    )
}