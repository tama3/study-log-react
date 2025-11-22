

export const RecordItem = (props) => {
    const { title, time, onDelete } = props;

    return (
        <li>
            {`${title} ${time}時間 `}
            <button onClick={onDelete}>削除</button>
        </li>
    );
}