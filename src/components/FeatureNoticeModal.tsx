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

// 2026-07-31 오늘 작성된 feat 커밋 이력 기반 목록 (모바일 가독성 최적화)
const TODAY_FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    tag: "UI/UX",
    title: "미투표자 실시간 현황 UI",
    commitMsg: "feat: 미투표 사용자에게도 투표 상세 화면 실시간 현황 UI 표시",
    description: "투표 전에도 상세 화면에서 실시간 득표 현황을 바로 확인 가능해요.",
  },
  {
    id: "feat-2",
    tag: "검색",
    title: "투표 제목 & 선택지 검색",
    commitMsg: "feat: 투표 제목 및 선택지 키워드 검색 기능 구현",
    description: "홈 화면에서 원하는 투표 제목이나 선택지(A/B) 키워드로 검색해보세요.",
  },
  {
    id: "feat-3",
    tag: "댓글",
    title: "비회원 댓글 및 수정·삭제",
    commitMsg: "feat: 비회원 댓글 작성 및 비밀번호 기반 수정/삭제 기능 구현",
    description: "비밀번호 입력으로 로그인 없이 댓글 작성, 수정, 삭제가 가능해요.",
  },
  {
    id: "feat-4",
    tag: "개선",
    title: "댓글 비번 모달 백드롭 개선",
    commitMsg: "feat: 댓글 비번 인증 모달 백드롭 수정",
    description: "댓글 수정/삭제 시 나타나는 비밀번호 인증 모달 스타일이 개선되었어요.",
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-sm sm:max-w-md shadow-2xl overflow-hidden border border-penguin-black/10 flex flex-col max-h-[85vh]">
        {/* 모달 헤더 */}
        <div className="bg-penguin-black text-white p-4 sm:p-5 relative flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="bg-penguin-yellow text-penguin-black text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              NEW RELEASE
            </span>
            <span className="text-[11px] sm:text-xs text-white/70 font-semibold">
              {getTodayDateString()}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
            🎉 오늘의 기능 개선 안내
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-300 font-medium">
            오늘 팽팽(PANGPANG)에 새로 추가된 기능 소식입니다.
          </p>

          <button
            onClick={handleClose}
            aria-label="닫기"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-sm"
          >
            ✕
          </button>
        </div>

        {/* 업데이트 항목 리스트 */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-2.5 sm:space-y-3 bg-gray-50/50">
          <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            오늘의 커밋 업데이트 ({TODAY_FEATURES.length}건)
          </div>

          {TODAY_FEATURES.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1 text-left"
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="bg-penguin-yellow/30 text-penguin-black text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded shrink-0">
                  {item.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-penguin-black leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                {item.description}
              </p>
              <div className="text-[9px] sm:text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 break-all leading-normal">
                📌 {item.commitMsg}
              </div>
            </div>
          ))}
        </div>

        {/* 모달 푸터 */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-2">
          <button
            onClick={handleHideTodayAndClose}
            className="flex-1 py-2 sm:py-2.5 px-3 text-xs font-bold text-gray-600 hover:text-penguin-black bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-center"
          >
            오늘 하루 보지 않기
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2 sm:py-2.5 px-3 text-xs font-black text-penguin-black bg-penguin-yellow hover:bg-amber-400 rounded-xl shadow-sm transition-colors text-center"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureNoticeModal;
