import { useState, useEffect } from 'react';
import { RecordItem } from './RecordItem';
import { InputForm } from './InputForm';
import { TotalDisplay } from './TotalDisplay';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL, 
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    );

export const StudyLogApp = () => {
    const [records, setRecords] = useState([]);

    // 初回レンダリング時のみ実行される
    useEffect(() => {
        getRecords();
    }, []);

    async function getRecords() {
        // 事前にsupabaseでRLS(行レベルセキュリティ)のselectポリシーを作成しないと空配列が返ってくるだけ
        const { data } = await supabase.from('study-record').select();
        console.log(data);
        setRecords(data);
    }

    const totalTime = records.reduce((sum, record) => sum + record.time, 0);

    const handleAdd = (title, time) => {
        const id = records.length === 0 ? 0 : records[records.length-1].id+1
        setRecords([...records, { id, title, time }])
    }

    const handleDelete = (id) => {
        // alert(`delete ${id}`);
        const newRecords = records.filter((record) => record.id !== id);
        setRecords(newRecords);
    }

    return (
        <>
            <h1>学習記録一覧</h1>
            <InputForm onAddRecord={handleAdd} />
            <ul>
                {records.map((record) => (
                    <RecordItem
                        key={record.id}
                        title={record.title}
                        time={record.time}
                        onDelete={() => handleDelete(record.id)}
                    />
                ))}
            </ul>
            <TotalDisplay totalTime={totalTime} />
        </>
    );
};