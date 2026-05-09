import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Management: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [poll, setPoll] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ id: '', pw: '' });
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      fetchPoll(id);
    }
  }, [id]);

  const fetchPoll = async (pollId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', pollId)
        .single();

      if (error) throw error;
      if (data) {
        setPoll(data);
        setEditForm({
          title: data.title,
          description: data.description || '',
        });
      }
    } catch (err) {
      console.error('Error fetching poll:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInfo.id === poll.admin_id && loginInfo.pw === poll.password) {
      setIsAuthenticated(true);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('polls')
        .update({
          title: editForm.title,
          description: editForm.description,
        })
        .eq('id', poll.id);

      if (error) throw error;

      alert('성공적으로 수정되었습니다!');
      navigate(`/poll/${poll.id}`);
    } catch (err: any) {
      alert('수정 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 투표를 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.')) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('polls')
          .delete()
          .eq('id', poll.id);

        if (error) throw error;

        alert('삭제되었습니다!');
        navigate('/');
      } catch (err: any) {
        alert('삭제 중 오류가 발생했습니다: ' + err.message);
        setLoading(false);
      }
    }
  };

  if (loading && !poll) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-penguin-yellow"></div>
        <p className="mt-4 text-gray-500 font-bold">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (!poll) return <div className="p-8 text-center font-bold text-penguin-black">투표를 찾을 수 없습니다.</div>;

  if (!isAuthenticated) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-3 text-penguin-black">관리자 인증</h1>
          <p className="text-gray-400 font-bold text-sm">작성자 본인 확인이 필요합니다.</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 ml-2 uppercase tracking-widest">ID</label>
            <input 
              type="text" 
              value={loginInfo.id}
              onChange={(e) => setLoginInfo({...loginInfo, id: e.target.value})}
              className="w-full p-5 bg-penguin-gray border-none rounded-[1.5rem] focus:ring-4 focus:ring-penguin-yellow font-black text-penguin-black transition-all" 
              placeholder="ID 입력"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 ml-2 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              value={loginInfo.pw}
              onChange={(e) => setLoginInfo({...loginInfo, pw: e.target.value})}
              className="w-full p-5 bg-penguin-gray border-none rounded-[1.5rem] focus:ring-4 focus:ring-penguin-yellow font-black text-penguin-black transition-all" 
              placeholder="••••••"
              required
            />
          </div>
          <button type="submit" className="w-full py-5 bg-penguin-black text-penguin-yellow rounded-[1.5rem] font-black text-xl shadow-xl shadow-gray-200 hover:bg-penguin-yellow hover:text-penguin-black active:scale-[0.98] transition-all mt-4">
            본인 확인
          </button>
          <Link to={`/poll/${id}`} className="block text-center text-sm font-bold text-penguin-black hover:opacity-70 transition-all">돌아가기</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-black mb-8 text-penguin-black">투표 내용 수정</h1>
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-black text-penguin-black mb-2">투표 제목 수정 (필수)</label>
          <input 
            required
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
            className="w-full p-5 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-black text-penguin-black" 
            maxLength={50}
          />
        </div>
        <div>
          <label className="block text-sm font-black text-penguin-black mb-2">상세 내용 수정 (선택)</label>
          <textarea 
            value={editForm.description}
            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
            className="w-full p-5 bg-penguin-gray border-none rounded-2xl h-32 focus:ring-4 focus:ring-penguin-yellow font-black text-penguin-black transition-all" 
            maxLength={300}
          />
        </div>

        <p className="text-xs text-gray-400 font-bold bg-gray-50 p-4 rounded-xl leading-relaxed">
          💡 투표 선택지는 데이터 무결성을 위해 수정을 제한하고 있습니다. 제목이나 설명만 수정 가능합니다.
        </p>
        
        <div className="flex gap-3 pt-6">
          <button 
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            삭제
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="flex-[2] py-4 bg-penguin-yellow text-penguin-black rounded-2xl font-black shadow-lg shadow-penguin-yellow/20 hover:bg-penguin-black hover:text-penguin-yellow transition-all disabled:opacity-50"
          >
            {loading ? '저장 중...' : '변경사항 저장'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Management;
