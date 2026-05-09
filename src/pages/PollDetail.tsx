import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POLLS } from '../mocks/data';
import { formatRelativeTime } from '../lib/utils';
import HighFiveAnimation from '../components/HighFiveAnimation';

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const poll = MOCK_POLLS.find(p => p.id === id);
  
  const [voted, setVoted] = useState<null | 'A' | 'B'>(null);
  const [pendingVote, setPendingVote] = useState<null | 'A' | 'B'>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!poll) return <div className="p-8 text-center font-bold text-penguin-black">투표를 찾을 수 없습니다.</div>;

  const handleVote = (choice: 'A' | 'B') => {
    setPendingVote(choice);
  };

  const onAnimationComplete = () => {
    setVoted(pendingVote);
    setPendingVote(null);
  };

  const total = poll.votesA + poll.votesB + (voted ? 1 : 0);
  const currentVotesA = poll.votesA + (voted === 'A' ? 1 : 0);
  const currentVotesB = poll.votesB + (voted === 'B' ? 1 : 0);
  
  const percentA = Math.round((currentVotesA / total) * 100);
  const percentB = 100 - percentA;

  const hasQuestion = !!poll.question && poll.question.trim().length > 0;
  const needsTruncation = hasQuestion && poll.question!.length > 100;
  const displayQuestion = (needsTruncation && !isExpanded) 
    ? poll.question!.slice(0, 100) + "..." 
    : poll.question;

  return (
    <div className="px-2 py-4 max-w-2xl mx-auto">
      <div className="mb-6 px-2">
        <Link to="/" className="text-sm text-penguin-black hover:opacity-70 font-black transition-all flex items-center gap-2">
          <span className="text-xl">←</span> 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white px-4 py-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_20px_70px_rgb(0,0,0,0.08)] border border-gray-50 mb-8 relative overflow-hidden">
        {/* 상단 배지 */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-8 md:mb-10">
          <div className="flex items-center gap-2 md:gap-3">
             <span className="bg-penguin-black text-penguin-yellow text-[9px] md:text-[10px] font-black px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-sm">Live Poll</span>
             <span className="text-[10px] md:text-xs text-gray-400 font-black">{total}명 참여중</span>
          </div>
          <span className="text-[10px] md:text-[11px] text-gray-400 font-black bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl">
             {formatRelativeTime(poll.createdAt)} 작성
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-xl md:text-5xl font-black mb-6 md:mb-8 leading-[1.3] md:leading-[1.4] text-penguin-black tracking-tight italic">
          {poll.title}
        </h1>

        {/* 상세 내용 */}
        {hasQuestion && (
          <div className="mb-10 md:mb-14 p-4 md:p-8 bg-penguin-gray/50 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
            <p className={`font-bold leading-[1.6] text-gray-600 transition-all duration-300 ${isExpanded ? 'text-base md:text-lg' : 'text-xs md:text-base'}`}>
              {displayQuestion}
            </p>
            {needsTruncation && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-[10px] md:text-xs font-black text-penguin-black bg-penguin-yellow px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl hover:bg-penguin-black hover:text-penguin-yellow transition-all shadow-sm"
              >
                {isExpanded ? '간략히 보기' : '상세 내용 더보기'}
              </button>
            )}
          </div>
        )}
        
        {!voted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-8">
            <button 
              onClick={() => handleVote('A')}
              className="group relative p-6 md:p-10 bg-penguin-black rounded-[1.5rem] md:rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl shadow-black/20 overflow-hidden"
            >
              <span className="text-[9px] font-black text-penguin-yellow/50 uppercase tracking-widest mb-2 block">Option A</span>
              <p className="font-black text-penguin-yellow text-base md:text-xl leading-snug relative z-10">{poll.optionA}</p>
              <span className="absolute -right-4 -bottom-4 text-7xl md:text-9xl opacity-10 font-black text-white italic">A</span>
            </button>
            <button 
              onClick={() => handleVote('B')}
              className="group relative p-6 md:p-10 bg-penguin-yellow rounded-[1.5rem] md:rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl shadow-penguin-yellow/30 overflow-hidden"
            >
              <span className="text-[9px] font-black text-penguin-black/40 uppercase tracking-widest mb-2 block">Option B</span>
              <p className="font-black text-penguin-black text-base md:text-xl leading-snug relative z-10">{poll.optionB}</p>
              <span className="absolute -right-4 -bottom-4 text-7xl md:text-9xl opacity-10 font-black text-penguin-black italic">B</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-8">
              {/* Option A Result: Fixed Alignment */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-end px-1 md:px-2 text-left gap-2 md:gap-4">
                  <span className={`text-base md:text-2xl font-black flex-1 ${voted === 'A' ? 'text-penguin-black' : 'text-gray-400'}`}>
                    {poll.optionA} {voted === 'A' && '✅'}
                  </span>
                  <div className="flex items-baseline gap-1 md:gap-2 flex-shrink-0">
                    <span className="text-lg md:text-3xl font-black text-penguin-black tabular-nums">{currentVotesA}표</span>
                    <span className="text-xs md:text-lg font-bold text-gray-400 tabular-nums">({percentA}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-10 md:h-16 rounded-[1rem] md:rounded-[2rem] overflow-hidden flex shadow-inner border-[3px] md:border-4 border-gray-100">
                  <div className="bg-penguin-black h-full transition-all duration-1000 relative min-w-0" style={{ width: `${percentA}%` }}>
                    <span className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 font-black text-penguin-yellow text-sm md:text-xl italic whitespace-nowrap">A</span>
                  </div>
                </div>
              </div>

              {/* Option B Result: Fixed Alignment */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-end px-1 md:px-2 text-left gap-2 md:gap-4">
                  <span className={`text-base md:text-2xl font-black flex-1 ${voted === 'B' ? 'text-penguin-black' : 'text-gray-300'}`}>
                    {poll.optionB} {voted === 'B' && '✅'}
                  </span>
                  <div className="flex items-baseline gap-1 md:gap-2 flex-shrink-0">
                    <span className="text-lg md:text-3xl font-black text-penguin-black tabular-nums">{currentVotesB}표</span>
                    <span className="text-xs md:text-lg font-bold text-gray-400 tabular-nums">({percentB}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-10 md:h-16 rounded-[1rem] md:rounded-[2rem] overflow-hidden flex shadow-inner border-[3px] md:border-4 border-gray-100">
                  <div className="bg-penguin-yellow h-full transition-all duration-1000 relative min-w-0" style={{ width: `${percentB}%` }}>
                    <span className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 font-black text-penguin-black text-sm md:text-xl italic whitespace-nowrap">B</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 text-center border-t border-gray-50">
               <p className="text-sm text-gray-400 font-black uppercase tracking-[0.1em]">총 {total}명이 팽팽하게 참여했습니다!</p>
            </div>
          </div>
        )}
      </div>

      {pendingVote && <HighFiveAnimation onComplete={onAnimationComplete} />}

      <div className="flex justify-between items-center px-4 md:px-8 gap-2">
        <Link 
          to={`/poll/${poll.id}/manage`}
          className="text-[9px] min-[360px]:text-[10px] md:text-sm font-black text-penguin-black hover:opacity-70 underline underline-offset-4 md:underline-offset-8 transition-all whitespace-nowrap"
        >
          관리자 메뉴 (수정/삭제)
        </Link>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
          }}
          className="flex items-center gap-1.5 md:gap-3 px-4 py-3 md:px-10 md:py-5 bg-penguin-yellow text-penguin-black hover:bg-penguin-black hover:text-penguin-yellow rounded-full text-[11px] md:text-lg font-black transition-all shadow-2xl active:scale-95 whitespace-nowrap"
        >
          <span>🔗 링크 복사</span>
        </button>
      </div>
    </div>
  );
};

export default PollDetail;
