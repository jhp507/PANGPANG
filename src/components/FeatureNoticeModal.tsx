import React, { useState, useEffect } from "react";

interface FeatureNoticeModalProps {
  forceOpen?: boolean;
  onCloseCallback?: () => void;
}

interface FeatureItem {
  id: string;
  tag: string;
  title: string;
  commitMsg: string;
  description: string;
  icon: string;
}

const STORAGE_KEY = "pangpang_hide_feature_notice_date";

// 오늘 날짜를 YYYY-MM-DD 포맷으로 반환하는 헬퍼 함수
const getTodayDateString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 2026-07-31 오늘 작성된 feat 커밋 이력 기반 목록
const TODAY_FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    tag: "UI/UX",
    title: "미투표 사용자 실시간 현황 UI 표시",
    commitMsg: "feat: 미투표 사용자에게도 투표 상세 화면 실시간 현황 UI 표시",
    description: "투표 참여 전에도 투표 상세 화면에서 현재 실시간 득표율 현황을 바로 확인할 수 있어요.",
    icon: "📊",
  },
  {
    id: "feat-2",
    tag: "검색",
    title: "투표 제목 및 선택지 키워드 검색",
    commitMsg: "feat: 투표 제목 및 선택지 키워드 검색 기능 구현",
    description: "홈 화면에서 원하는 투표 제목이나 선택지(A/B) 키워드로 관심 있는 투표를 빠르게 찾아보세요.",
    icon: "🔍",
  },
  {
    id: "feat-3",
    tag: "댓글",
    title: "비회원 댓글 작성 & 비밀번호 수정/삭제",
    commitMsg: "feat: 비회원 댓글 작성 및 비밀번호 기반 수정/삭제 기능 구현",
    description: "로그인 없이도 닉네임과 비밀번호 입력만으로 자유롭게 댓글을 달고 수정/삭제할 수 있어요.",
    icon: "💬",
  },
  {
    id: "feat-4",
    tag: "개선",
    title: "댓글 비번 인증 모달 백드롭 개선",
    commitMsg: "feat: 댓글 비번 인증 모달 백드롭 수정",
    description: "댓글 수정/삭제 시 표시되는 비밀번호 인증 모달의 백드롭 모션과 시각적 스타일이 한층 깔끔해졌어요.",
    icon: "🔐",
  },
];

export const FeatureNoticeModal: React.FC<FeatureNoticeModalProps> = ({
  forceOpen = false,
  onCloseCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    const todayStr = getTodayDateString();
    const savedHideDate = localStorage.getItem(STORAGE_KEY);

    // 저장된 날짜가 오늘 날짜와 다르면 팝업 노출
    if (savedHideDate !== todayStr) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseCallback) onCloseCallback();
  };

  const handleHideTodayAndClose = () => {
    const todayStr = getTodayDateString();
    localStorage.setItem(STORAGE_KEY, todayStr);
    setIsOpen(false);
    if (onCloseCallback) onCloseCallback();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden border-2 border-penguin-black/10 flex flex-col max-h-[90vh]">
        {/* 모달 헤더 */}
        <div className="bg-penguin-black text-white p-6 relative flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-penguin-yellow text-penguin-black text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              NEW RELEASE
            </span>
            <span className="text-xs text-white/70 font-semibold">
              {getTodayDateString()} 업데이트
            </span>
          </div>

          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2 mt-1">
            <span>🎉 오늘의 기능 개선 안내</span>
          </h2>
          <p className="text-xs text-gray-300 font-medium leading-relaxed">
            오늘 팽팽(PANGPANG)에 반영된 새로운 기능 커밋 소식을 확인해보세요!
          </p>

          <button
            onClick={handleClose}
            aria-label="닫기"
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* 업데이트 항목 리스트 (스크롤 가능) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/50">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            오늘 반영된 커밋이력 ({TODAY_FEATURES.length}건)
          </div>

          {TODAY_FEATURES.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-3.5 items-start"
            >
              <div className="text-2xl p-2.5 bg-penguin-yellow/20 rounded-xl shrink-0 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-black text-penguin-black truncate">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 font-medium leading-normal mb-1.5">
                  {item.description}
                </p>
                <div className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 truncate">
                  📌 {item.commitMsg}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 모달 푸터: 오늘 하루 보지 않기 & 닫기 */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={handleHideTodayAndClose}
            className="flex-1 py-2.5 px-4 text-xs font-bold text-gray-600 hover:text-penguin-black bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-center"
          >
            오늘 하루 보지 않기
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 px-4 text-xs font-black text-penguin-black bg-penguin-yellow hover:bg-amber-400 rounded-xl shadow-sm transition-colors text-center"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureNoticeModal;
