type NumberButtonProps = {
    key: number;
    number: number;
    status: string;
}

export const NumberButton = (props: NumberButtonProps) => {

    const colors: {[index: string]:any} = {
        available: 'lightgray',
        used: '#53BF9D',
        wrong: '#F87474',
        candidate: '#3B9AE1'
    };

    return (
        <button
            className="number"
            style={{ backgroundColor: colors[props.status] }}
            onClick={() => console.log('Number ' + props.number + ' - ' + props.status)}>
            {props.number}
        </button>
    );
}