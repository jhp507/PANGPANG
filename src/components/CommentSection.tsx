import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { formatRelativeTime } from "../lib/utils";

interface Comment {
  id: string;
  poll_id: string;
  nickname: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface CommentSectionProps {
  pollId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ pollId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 작성 폼 상태
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 인증 / 모달 상태 (수정 및 삭제용)
  const [activeComment, setActiveComment] = useState<Comment | null>(null);
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);
  const [authPassword, setAuthPassword] = useState("");
  const [editContent, setEditContent] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    fetchComments();
  }, [pollId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("poll_comments")
        .select("id, poll_id, nickname, content, created_at, updated_at")
        .eq("poll_id", pollId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setComments(data as Comment[]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim() || !password.trim() || !content.trim()) {
      alert("닉네임, 비밀번호, 댓글 내용을 모두 입력해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("poll_comments").insert([
        {
          poll_id: pollId,
          nickname: nickname.trim(),
          password: password.trim(),
          content: content.trim(),
        },
      ]);

      if (error) throw error;

      // 폼 초기화 및 목록 새로고침
      setContent("");
      fetchComments();
    } catch (err: any) {
      console.error("Error creating comment:", err);
      alert("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const openAuthModal = (comment: Comment, type: "edit" | "delete") => {
    setActiveComment(comment);
    setActionType(type);
    setAuthPassword("");
    setEditContent(comment.content);
    setAuthError("");
  };

  const closeAuthModal = () => {
    setActiveComment(null);
    setActionType(null);
    setAuthPassword("");
    setEditContent("");
    setAuthError("");
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeComment || !actionType) return;
    if (!authPassword.trim()) {
      setAuthError("비밀번호를 입력해주세요.");
      return;
    }

    setAuthLoading(true);
    setAuthError("");

    try {
      // DB에서 비밀번호 확인
      const { data, error } = await supabase
        .from("poll_comments")
        .select("password")
        .eq("id", activeComment.id)
        .single();

      if (error || !data) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      if (data.password !== authPassword.trim()) {
        setAuthError("비밀번호가 일치하지 않습니다.");
        setAuthLoading(false);
        return;
      }

      if (actionType === "delete") {
        const { error: deleteError } = await supabase
          .from("poll_comments")
          .delete()
          .eq("id", activeComment.id);

        if (deleteError) throw deleteError;
        closeAuthModal();
        fetchComments();
      } else if (actionType === "edit") {
        if (!editContent.trim()) {
          setAuthError("수정할 댓글 내용을 입력해주세요.");
          setAuthLoading(false);
          return;
        }

        const { error: updateError } = await supabase
          .from("poll_comments")
          .update({
            content: editContent.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", activeComment.id);

        if (updateError) throw updateError;
        closeAuthModal();
        fetchComments();
      }
    } catch (err: any) {
      console.error("Error updating/deleting comment:", err);
      setAuthError("처리 중 오류가 발생했습니다.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white/50 backdrop-blur-[2px] p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_10px_40px_rgb(0,0,0,0.05)] border border-gray-100">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg md:text-2xl font-black text-penguin-black flex items-center gap-2">
          💬 댓글 <span className="text-penguin-yellow bg-penguin-black px-3 py-0.5 rounded-full text-xs md:text-sm font-black">{comments.length}</span>
        </h2>
      </div>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleCreateComment} className="mb-10 space-y-4 bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            maxLength={15}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 (최대 15자)"
            className="w-full px-4 py-3 bg-penguin-gray border-none rounded-xl font-bold text-xs md:text-sm text-penguin-black focus:ring-2 focus:ring-penguin-yellow transition-all"
          />
          <input
            type="password"
            required
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (수정/삭제용)"
            className="w-full px-4 py-3 bg-penguin-gray border-none rounded-xl font-bold text-xs md:text-sm text-penguin-black focus:ring-2 focus:ring-penguin-yellow transition-all"
          />
        </div>
        <div className="relative">
          <textarea
            required
            rows={3}
            maxLength={300}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="따뜻한 댓글을 남겨주세요... 🐧"
            className="w-full p-4 bg-penguin-gray border-none rounded-2xl font-bold text-xs md:text-sm text-penguin-black focus:ring-2 focus:ring-penguin-yellow transition-all resize-none placeholder:text-gray-400"
          />
          <div className="flex justify-between items-center mt-2 px-1">
            <span className="text-[10px] md:text-xs text-gray-400 font-bold">
              {content.length}/300자
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-penguin-black text-penguin-yellow rounded-xl font-black text-xs md:text-sm hover:bg-penguin-yellow hover:text-penguin-black transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {submitting ? "등록 중..." : "댓글 등록"}
            </button>
          </div>
        </div>
      </form>

      {/* 댓글 목록 */}
      {loading ? (
        <div className="text-center py-8 text-gray-400 font-bold text-xs">
          댓글을 불러오는 중...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-white/60 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold text-xs md:text-sm">
            아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요! 🐧
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-5 md:p-6 bg-white rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs md:text-sm text-penguin-black">
                    {comment.nickname}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-400 font-bold">
                    {formatRelativeTime(comment.created_at)}
                    {comment.updated_at !== comment.created_at && " (수정됨)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openAuthModal(comment, "edit")}
                    className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-penguin-black transition-colors underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => openAuthModal(comment, "delete")}
                    className="text-[10px] md:text-xs font-bold text-red-400 hover:text-red-600 transition-colors underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-xs md:text-sm font-bold text-penguin-black/90 whitespace-pre-wrap leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 비밀번호 인증 / 수정 모달 */}
      {activeComment && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-gray-100 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-base md:text-lg text-penguin-black">
                {actionType === "edit" ? "✏️ 댓글 수정" : "🗑️ 댓글 삭제"}
              </h3>
              <button
                onClick={closeAuthModal}
                className="text-gray-400 hover:text-penguin-black font-black text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {actionType === "edit" && (
                <div>
                  <label className="block text-xs font-black text-penguin-black mb-1">
                    수정할 댓글 내용
                  </label>
                  <textarea
                    required
                    rows={3}
                    maxLength={300}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 bg-penguin-gray border-none rounded-xl font-bold text-xs md:text-sm text-penguin-black focus:ring-2 focus:ring-penguin-yellow transition-all resize-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-black text-penguin-black mb-1">
                  작성 시 입력한 비밀번호
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full px-4 py-3 bg-penguin-gray border-none rounded-xl font-bold text-xs md:text-sm text-penguin-black focus:ring-2 focus:ring-penguin-yellow transition-all"
                />
              </div>

              {authError && (
                <p className="text-xs font-bold text-red-500">{authError}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="flex-1 py-3 bg-penguin-gray text-penguin-black rounded-xl text-xs font-black hover:bg-gray-200 transition-all"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={authLoading}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                    actionType === "delete"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-penguin-yellow text-penguin-black hover:bg-penguin-black hover:text-penguin-yellow"
                  }`}
                >
                  {authLoading
                    ? "처리 중..."
                    : actionType === "edit"
                    ? "수정 완료"
                    : "삭제하기"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
