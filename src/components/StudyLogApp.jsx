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
    const [loading, setLoading] = useState(true);

    // 初回レンダリング時のみ実行される
    useEffect(() => {
        getRecords();
    }, []);

    async function getRecords() {
        setLoading(true);

        try {
            // 事前にsupabaseでRLS(行レベルセキュリティ)のselectポリシーを作成しないと空配列が返ってくるだけ
            const { data } = await supabase.from('study-record').select(`id, title, time`);
            setRecords(data);
        } catch (error) {
            console.log('データの取得中に予期せぬエラーが発生しました。', error);
        } finally {
            setLoading(false);
        }
    }

    async function insertRecord(record) {
        const { data, error } = await supabase.from('study-record').insert(record);
    }

    async function deleteRecord(id) {
        const { data, error } = await supabase.from('study-record').delete().eq('id', id);
    }

    const totalTime = records.reduce((sum, record) => sum + record.time, 0);

    const handleAdd = async (title, time) => {
        await insertRecord({ title, time });
        getRecords();
    }

    const handleDelete = async (id) => {
        await deleteRecord(id);
        getRecords();
    }

    return (
        <>
            <h1>学習記録一覧</h1>
            <InputForm onAddRecord={handleAdd} />
            {loading ? (
                <p>Loading...</p>
            ) : (
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
            )}
            <TotalDisplay totalTime={totalTime} />
        </>
    );
};