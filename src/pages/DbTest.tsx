import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface TableStatus {
  name: string;
  status: 'loading' | 'success' | 'error';
  message?: string;
}

const DbTest: React.FC = () => {
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([
    { name: 'polls', status: 'loading' },
    { name: 'poll_options', status: 'loading' },
    { name: 'votes', status: 'loading' },
  ]);
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    const checkTables = async () => {
      const tables = ['polls', 'poll_options', 'votes'];
      
      for (const tableName of tables) {
        try {
          const { error, data } = await supabase
            .from(tableName)
            .select('count', { count: 'exact', head: true });

          if (error) throw error;

          setTableStatuses(prev => 
            prev.map(t => t.name === tableName ? { ...t, status: 'success' } : t)
          );

          // polls 테이블인 경우 데이터도 일부 가져와서 확인
          if (tableName === 'polls') {
            const { data: pollData } = await supabase.from('polls').select('*').limit(5);
            setPolls(pollData || []);
          }
        } catch (err: any) {
          console.error(`Error checking table ${tableName}:`, err);
          setTableStatuses(prev => 
            prev.map(t => t.name === tableName ? { ...t, status: 'error', message: err.message } : t)
          );
        }
      }
    };

    checkTables();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen bg-gray-50">
      <Link to="/" className="text-blue-500 hover:underline mb-8 inline-block font-bold">← 홈으로</Link>
      <h1 className="text-3xl font-black mb-8 text-gray-900">데이터베이스 연결 테스트</h1>

      <div className="grid gap-4 mb-8">
        {tableStatuses.map((table) => (
          <div key={table.name} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-800 uppercase">{table.name}</span>
              <p className="text-sm text-gray-500">테이블 상태 확인</p>
            </div>
            <div className="flex items-center">
              {table.status === 'loading' && (
                <span className="flex items-center text-gray-400 font-bold">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  확인 중...
                </span>
              )}
              {table.status === 'success' && (
                <span className="text-green-500 font-bold flex items-center">
                  <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  정상 연결
                </span>
              )}
              {table.status === 'error' && (
                <span className="text-red-500 font-bold flex items-center">
                  <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  오류 발생
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {tableStatuses.some(t => t.name === 'polls' && t.status === 'success') && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">최근 생성된 투표 (최대 5개)</h2>
          {polls.length === 0 ? (
            <p className="text-gray-400 italic">아직 생성된 투표가 없습니다.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {polls.map((poll) => (
                <li key={poll.id} className="py-3">
                  <p className="font-bold text-gray-900">{poll.title}</p>
                  <p className="text-xs text-gray-500">생성일: {new Date(poll.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tableStatuses.some(t => t.status === 'error') && (
        <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl">
          <p className="text-red-700 font-bold text-sm">⚠️ 오류 로그:</p>
          {tableStatuses.filter(t => t.status === 'error').map(t => (
            <p key={t.name} className="text-red-600 text-xs mt-1">
              [{t.name}] {t.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DbTest;
