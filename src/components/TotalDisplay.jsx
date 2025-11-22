export const TotalDisplay = (props) => {
    const { totalTime } = props;
    return (
        <div>
            <p>合計時間</p>
            <p>{totalTime}</p>
            <p>/1000(h)</p>
        </div>
    );
}