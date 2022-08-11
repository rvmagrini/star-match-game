import { mathUtils } from "../MathUtils"

type StarsDisplayProps = {
    amount: number
}

export const StarsDisplay = (props: StarsDisplayProps) => {

    return (
        <>
            {mathUtils.range(1, props.amount).map(starId =>
                <div key={starId} className="star" />
            )}
        </>
    )
}