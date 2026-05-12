import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { formatRelativeTime } from "../lib/utils";
import TypewriterTitle from "../components/TypewriterTitle";
import HighFiveAnimation from "../components/HighFiveAnimation";

interface Poll {
  id: string;
  title: string;
  created_at: string;
  options: {
    id: string;
    option_text: string;
    vote_count: number;
  }[];
  total_votes: number;
}

type FilterType = "hot" | "popular" | "latest";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get("filter") as FilterType) || "hot";

  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFire, setShowFire] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("polls")
        .select(
          `
          id,
          title,
          created_at,
          poll_options (
            id,
            option_text,
            order_index,
            votes (count)
          )
        `,
        )
        .eq("status", "open");

      if (error) throw error;

      if (data) {
        const formattedPolls: Poll[] = data.map((poll: any) => {
          const options = poll.poll_options
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

          return {
            id: poll.id,
            title: poll.title,
            created_at: poll.created_at,
            options,
            total_votes,
          };
        });

        setPolls(formattedPolls);
      }
    } catch (err) {
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  };
  const getSortedPolls = () => {
    const sorted = [...polls];
    if (filter === "hot") {
      return sorted.sort((a, b) => {
        const getIsHot = (p: Poll) =>
          p.total_votes >= 10 &&
          p.options[0].vote_count / p.total_votes >= 0.45 &&
          p.options[0].vote_count / p.total_votes <= 0.55;
        const isHotA = getIsHot(a);
        const isHotB = getIsHot(b);

        if (isHotA && !isHotB) return -1;
        if (!isHotA && isHotB) return 1;

        if (a.total_votes === 0 && b.total_votes === 0) return 0;
        if (a.total_votes === 0) return 1;
        if (b.total_votes === 0) return -1;

        const ratioA = a.options[0].vote_count / a.total_votes;
        const ratioB = b.options[0].vote_count / b.total_votes;
        const diffA = Math.abs(ratioA - 0.5);
        const diffB = Math.abs(ratioB - 0.5);

        if (diffA !== diffB) return diffA - diffB;
        return b.total_votes - a.total_votes;
      });
    }

    if (filter === "popular") {
      return sorted.sort((a, b) => b.total_votes - a.total_votes);
    }
    return sorted.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  };

  if (loading) {
    return (
      <div className="px-2 py-4 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-penguin-yellow"></div>
        <p className="mt-4 text-gray-500 font-bold">
          투표 목록을 불러오는 중...
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <TypewriterTitle />
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {[
          {
            id: "hot",
            label: (
              <>
                <span className="animate-fire mr-1">🔥</span> 치열함
              </>
            ),
          },
          {
            id: "popular",
            label: (
              <>
                <span className="animate-star mr-1">⭐</span> 인기순
              </>
            ),
          },
          { id: "latest", label: "🕒 최신순" },
        ].map((tab) => (
          <button
            key={tab.id as string}
            onClick={() => setSearchParams({ filter: tab.id })}
            className={`px-5 py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap flex items-center ${
              filter === tab.id
                ? "bg-penguin-yellow text-penguin-black shadow-md"
                : "bg-white text-penguin-black border border-gray-100 hover:bg-penguin-yellow/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {polls.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold">
            아직 생성된 투표가 없습니다.
            <br />첫 번째 투표를 만들어보세요! 🐧
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {getSortedPolls().map((poll) => {
            const total = poll.total_votes;
            const optA = poll.options[0];
            const optB = poll.options[1];

            const percentA =
              total > 0 ? Math.round((optA.vote_count / total) * 100) : 50;
            const percentB = 100 - percentA;
            const isHot = total >= 10 && percentA >= 45 && percentA <= 55;

            return (
              <Link
                key={poll.id}
                to={`/poll/${poll.id}?filter=${filter}`}
                className="group block bg-white/50 backdrop-blur-[2px] p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all border-2 border-transparent hover:border-penguin-yellow"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2 h-6">
                    {isHot && (
                      <span className="flex items-center justify-center bg-penguin-yellow text-penguin-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pang-pulse">
                        팽팽<span className="animate-fire">🔥</span>
                      </span>
                    )}
                    <span className="flex items-center justify-center text-[10px] text-gray-500 font-bold px-3 py-1 bg-gray-50 rounded-full">
                      {total}명 참여
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-black">
                    {formatRelativeTime(poll.created_at)}
                  </span>
                </div>

                <div className="mb-6 min-h-[3.5rem] md:min-h-[4rem] flex flex-col justify-center">
                  <h2 className="font-black text-lg md:text-xl group-hover:text-penguin-black transition-colors line-clamp-2 leading-[1.4]">
                    {poll.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between gap-4 px-1">
                    <span className="text-penguin-black font-black text-xs md:text-sm line-clamp-1 flex-1">
                      {optA.option_text}
                    </span>
                    <span className="text-penguin-black font-black text-xs md:text-sm line-clamp-1 flex-1 text-right">
                      {optB.option_text}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 h-9 md:h-10 rounded-2xl overflow-hidden flex shadow-inner border-2 border-gray-50">
                    <div
                      className="bg-penguin-black h-full transition-all duration-1000 flex items-center px-4"
                      style={{ width: `${percentA}%` }}
                    >
                      <span className="text-xs md:text-sm font-black text-penguin-yellow italic">
                        A
                      </span>
                    </div>
                    <div
                      className="bg-penguin-yellow h-full transition-all duration-1000 flex items-center justify-end px-4"
                      style={{ width: `${percentB}%` }}
                    >
                      <span className="text-xs md:text-sm font-black text-penguin-black italic">
                        B
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between px-1 text-penguin-black items-start h-10">
                    <div className="flex flex-col items-start">
                      <span className="text-sm md:text-base font-black leading-none">
                        {optA.vote_count}표
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">
                        ({percentA}%)
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm md:text-base font-black leading-none">
                        {optB.vote_count}표
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 mt-1">
                        ({percentB}%)
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 액션 버튼 그룹 (Create 버튼만 유지) */}
      <div className="fixed bottom-8 right-6 z-20">
        <Link
          to="/create"
          className="w-12 h-12 bg-penguin-yellow text-penguin-black rounded-full text-2xl shadow-2xl flex items-center justify-center hover:bg-penguin-black hover:text-penguin-yellow hover:scale-110 active:scale-95 transition-all border-4 border-white"
        >
          <span className="mb-1 font-black">+</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
