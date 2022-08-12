type PlayAgainProps = {
    onClick: any;
}

export const PlayAgain = (props: PlayAgainProps) => {

    return (
        <>
            <div className="game-done">
                <button
                    className="play-again"
                    onClick={props.onClick}>
                    PLAY AGAIN
                </button>
            </div>
        </>
    )
}