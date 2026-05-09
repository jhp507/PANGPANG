import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!option1.trim() || !option2.trim()) {
      alert("두 개의 선택지를 모두 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      // 1. 투표 메인 정보 저장 (polls)
      const { data: pollData, error: pollError } = await supabase
        .from("polls")
        .insert([
          {
            title,
            description: description || null,
            admin_id: adminId,
            password,
            status: "open",
          },
        ])
        .select()
        .single();

      if (pollError) throw pollError;

      // 2. 선택지 저장 (poll_options)
      const { error: optionsError } = await supabase
        .from("poll_options")
        .insert([
          { poll_id: pollData.id, option_text: option1, order_index: 0 },
          { poll_id: pollData.id, option_text: option2, order_index: 1 },
        ]);

      if (optionsError) throw optionsError;

      alert("새로운 투표가 생성되었습니다!");
      navigate(`/poll/${pollData.id}`);
    } catch (err: any) {
      console.error("Error creating poll:", err);
      alert("투표 생성 중 오류가 발생했습니다: ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-4 max-w-md mx-auto">
      <h1 className="text-3xl font-black mb-8 text-penguin-black px-2">
        새 투표 만들기
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-black text-penguin-black mb-2 ml-1">
              투표 제목 (필수)
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-5 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-base text-penguin-black"
              placeholder="예: 점심 메뉴 추천해주세요!"
              maxLength={50}
            />
          </div>
          <div>
            <label className="block text-sm font-black text-penguin-black mb-2 ml-1">
              상세 내용 (선택)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-5 bg-penguin-gray border-none rounded-2xl h-32 focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-base placeholder:text-gray-300 text-penguin-black"
              placeholder="투표에 대한 상세 설명을 적어보세요."
              maxLength={300}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-black text-penguin-black mb-1 ml-1">
              선택지 입력 (2개 고정)
            </label>
            <input
              required
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              className="w-full p-5 bg-penguin-black border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-base text-white"
              placeholder="선택지 1"
              maxLength={50}
            />
            <input
              required
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              className="w-full p-5 bg-penguin-yellow border-none rounded-2xl focus:ring-4 focus:ring-black transition-all font-bold text-base text-penguin-black"
              placeholder="선택지 2"
              maxLength={50}
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
          <p className="text-sm font-black text-penguin-black mb-2 ml-1">
            🛡️ 관리 정보 설정 (수정/삭제용)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full p-4 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-base text-penguin-black"
              placeholder="관리자 ID"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-penguin-gray border-none rounded-2xl focus:ring-4 focus:ring-penguin-yellow transition-all font-bold text-base text-penguin-black"
              placeholder="비밀번호"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all ${
            loading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-penguin-yellow text-penguin-black shadow-penguin-yellow/20 hover:bg-penguin-black hover:text-penguin-yellow hover:-translate-y-1 active:translate-y-0"
          }`}
        >
          {loading ? "생성 중..." : "투표 생성하기"}
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
