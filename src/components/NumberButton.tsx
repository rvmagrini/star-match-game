type NumberButtonProps = {
    key: number;
    number: number
}

export const NumberButton = (props: NumberButtonProps) => {

    return (
        <button 
            className="number"
            onClick={() => console.log('Number ' + props.number)}>
                {props.number}
        </button>
    );
}