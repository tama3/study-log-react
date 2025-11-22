import { useState } from "react";

export const InputForm = (props) => {
    const { onAddRecord } = props;
    const [title, setTitle] = useState('');
    const [time, setTime] = useState(0);

    const handleAdd = () => {
        onAddRecord(title, time);
        setTitle('');
        setTime(0);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="学習内容"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    type="number"
                    min="0"
                    value={time} 
                    onChange={(e) => setTime(Number(e.target.value))}
                />
                <button onClick={handleAdd}>登録</button>
            </div>
            学習内容: {title}<br />
            時間: {time}
        </div>
    );
}