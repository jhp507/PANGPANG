import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { formatRelativeTime } from "../lib/utils";
import HighFiveAnimation from "../components/HighFiveAnimation";

interface PollOption {
  id: string;
  option_text: string;
  vote_count: number;
}

interface PollData {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  options: PollOption[];
  total_votes: number;
}

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [voterId, setVoterId] = useState<string>("");
  const [myVote, setMyVote] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pendingVoteId, setPendingVoteId] = useState<string | null>(null);

  useEffect(() => {
    // 1. 투표자 식별 (Voter ID)
    let storedId = localStorage.getItem("voter_id");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("voter_id", storedId);
    }
    setVoterId(storedId);

    if (id) {
      fetchPollAndUserVote(id, storedId);
    }
  }, [id]);

  const fetchPollAndUserVote = async (
    pollId: string,
    currentVoterId: string,
  ) => {
    setLoading(true);
    try {
      const { data: pollData, error: pollError } = await supabase
        .from("polls")
        .select(
          `
          id,
          title,
          description,
          created_at,
          poll_options (
            id,
            option_text,
            order_index,
            votes (count)
          )
        `,
        )
        .eq("id", pollId)
        .single();

      if (pollError) throw pollError;

      // 내 투표 기록 조회
      const { data: voteData } = await supabase
        .from("votes")
        .select("option_id")
        .eq("poll_id", pollId)
        .eq("voter_id", currentVoterId)
        .maybeSingle();

      if (voteData) {
        setMyVote(voteData.option_id);
      }

      if (pollData) {
        const options = pollData.poll_options
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((opt: any) => ({
            id: opt.id,
            option_text: opt.option_text,
            vote_count: opt.votes[0]?.count || 0,
          }));

        const total_votes = options.reduce(
          (sum: number, opt: any) => sum + opt.vote_count,
          0,
        );

        setPoll({
          id: pollData.id,
          title: pollData.title,
          description: pollData.description,
          created_at: pollData.created_at,
          options,
          total_votes,
        });
      }
    } catch (err) {
      console.error("Error fetching poll:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoteClick = (optionId: string) => {
    if (myVote || voting || !poll) return;
    setPendingVoteId(optionId);
  };

  const onAnimationComplete = async () => {
    if (!pendingVoteId || !poll) return;

    const optionId = pendingVoteId;
    setPendingVoteId(null);
    setVoting(true);

    try {
      const { error } = await supabase.from("votes").insert([
        {
          poll_id: poll.id,
          option_id: optionId,
          voter_id: voterId,
        },
      ]);

      if (error) {
        console.error("Voting error:", error);
        throw new Error("Voting failed");
      } else {
        setMyVote(optionId);
        fetchPollAndUserVote(poll.id, voterId);
      }
    } catch (err: any) {
      alert("투표 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-penguin-yellow"></div>
        <p className="mt-4 text-gray-500 font-bold">
          투표 데이터를 불러오는 중...
        </p>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="p-8 text-center font-bold text-penguin-black">
        투표를 찾을 수 없습니다.
        <br />
        <Link to="/" className="text-sm underline mt-4 inline-block">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const hasDescription =
    !!poll.description && poll.description.trim().length > 0;
  const needsTruncation = hasDescription && poll.description!.length > 100;
  const displayDescription =
    needsTruncation && !isExpanded
      ? poll.description!.slice(0, 100) + "..."
      : poll.description;

  const total = poll.total_votes;
  const percentA =
    total > 0 ? Math.round((poll.options[0].vote_count / total) * 100) : 50;
  const isHot = total >= 10 && percentA >= 45 && percentA <= 55;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 px-2">
        <Link
          to="/"
          className="text-sm text-penguin-black hover:opacity-70 font-black transition-all flex items-center gap-2"
        >
          <span className="text-xl">←</span> 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white/50 backdrop-blur-[2px] p-6 md:p-8 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_20px_70px_rgb(0,0,0,0.08)] border border-gray-50/50 mb-8 relative overflow-hidden">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-8 md:mb-10">
          <div className="flex items-center gap-2 md:gap-3">
            {isHot && (
              <span className="bg-penguin-yellow text-penguin-black text-[9px] md:text-[10px] font-black px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider shadow-sm animate-pang-pulse">
                팽팽<span className="animate-fire">🔥</span>
              </span>
            )}
            {/* <span className="bg-penguin-black text-penguin-yellow text-[9px] md:text-[10px] font-black px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-sm">
              Live Poll
            </span> */}
            <span className="text-[10px] md:text-xs text-gray-400 font-black">
              {poll.total_votes}명 참여중
            </span>
          </div>
          <span className="text-[10px] md:text-[11px] text-gray-400 font-black bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl">
            {formatRelativeTime(poll.created_at)} 작성
          </span>
        </div>

        <h1 className="text-xl md:text-5xl font-black mb-6 md:mb-8 leading-[1.3] md:leading-[1.4] text-penguin-black tracking-tight italic">
          {poll.title}
        </h1>

        {hasDescription && (
          <div className="mb-10 md:mb-14 p-4 md:p-8 bg-penguin-gray/50 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100">
            <p
              className={`font-bold leading-[1.6] text-gray-600 transition-all duration-300 ${isExpanded ? "text-base md:text-lg" : "text-xs md:text-base"}`}
            >
              {displayDescription}
            </p>
            {needsTruncation && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-[10px] md:text-xs font-black text-penguin-black bg-penguin-yellow px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl hover:bg-penguin-black hover:text-penguin-yellow transition-all shadow-sm"
              >
                {isExpanded ? "간략히 보기" : "상세 내용 더보기"}
              </button>
            )}
          </div>
        )}

        {!myVote ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-8">
            {poll.options.map((option, index) => (
              <button
                key={option.id}
                disabled={voting || !!pendingVoteId}
                onClick={() => handleVoteClick(option.id)}
                className={`group relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-left hover:scale-[1.03] transition-all shadow-xl overflow-hidden ${
                  index === 0
                    ? "bg-penguin-black shadow-black/20"
                    : "bg-penguin-yellow shadow-penguin-yellow/30"
                }`}
              >
                <span
                  className={`text-[9px] font-black uppercase tracking-widest mb-2 block ${
                    index === 0 ? "text-penguin-yellow" : "text-penguin-black"
                  }`}
                >
                  Option {String.fromCharCode(65 + index)}
                </span>
                <p
                  className={`font-black text-base md:text-xl leading-snug relative z-10 ${
                    index === 0 ? "text-penguin-yellow" : "text-penguin-black"
                  }`}
                >
                  {option.option_text}
                </p>
                <span
                  className={`absolute -right-4 -bottom-4 text-7xl md:text-9xl opacity-10 font-black italic ${
                    index === 0 ? "text-white" : "text-penguin-black"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-8">
              {poll.options.map((option, index) => {
                const percent =
                  poll.total_votes > 0
                    ? Math.round((option.vote_count / poll.total_votes) * 100)
                    : 0;
                const isSelected = myVote === option.id;

                return (
                  <div key={option.id} className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-end px-1 md:px-2 text-left gap-2 md:gap-4">
                      <span
                        className={`text-base md:text-2xl font-black flex-1 ${isSelected ? "text-penguin-black" : "text-gray-400"}`}
                      >
                        {option.option_text} {isSelected && "✅"}
                      </span>
                      <div className="flex items-baseline gap-1 md:gap-2 flex-shrink-0">
                        <span className="text-lg md:text-3xl font-black text-penguin-black tabular-nums">
                          {option.vote_count}표
                        </span>
                        <span className="text-xs md:text-lg font-bold text-gray-400 tabular-nums">
                          ({percent}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-10 md:h-16 rounded-[1rem] md:rounded-[2rem] overflow-hidden flex shadow-inner border-[3px] md:border-4 border-gray-100">
                      <div
                        className={`h-full transition-all duration-1000 relative min-w-0 ${
                          index === 0 ? "bg-penguin-black" : "bg-penguin-yellow"
                        }`}
                        style={{ width: `${percent}%` }}
                      >
                        <span
                          className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 font-black text-sm md:text-xl italic whitespace-nowrap ${
                            index === 0
                              ? "text-penguin-yellow"
                              : "text-penguin-black"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 text-center border-t border-gray-50">
              <p className="text-sm text-gray-400 font-black uppercase tracking-[0.1em]">
                총 {poll.total_votes}명이 참여했습니다!
              </p>
            </div>
          </div>
        )}
      </div>

      {pendingVoteId && <HighFiveAnimation onComplete={onAnimationComplete} />}

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
            alert("링크가 복사되었습니다!");
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
