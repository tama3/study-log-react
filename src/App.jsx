import { useState } from 'react';
import './styles.css';


function App() {
  const [records, setRecords] = useState([
    {
      id: 1,
      title: 'テスト',
      time: 10
    },
    {
      id: 2,
      title: 'React',
      time: 20
    },
  ]);

  const totalTime = records.reduce((sum, record) => sum + record.time, 0);

  return (
    <div className="container">
      <h1>学習記録一覧</h1>
      <input type="text" placeholder="学習内容" />
      <br />
      <input type="number" min="0" />
      <button>登録</button>
      <br />
      学習内容:<br />
      時間: 0
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <span>{record.title}</span>
            <span>{record.time}時間</span>
            <button>削除</button>
          </li>
        ))}
      </ul>
      <p>合計時間</p>
      <p>{totalTime}</p>
      <p>/1000(h)</p>
    </div>
  )
}

export default App
