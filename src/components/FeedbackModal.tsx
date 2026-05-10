import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    const voterId = localStorage.getItem('voter_id');

    const { error } = await supabase
      .from('feedbacks')
      .insert([{ voter_id: voterId, content: feedback }]);

    if (error) {
      console.error("Feedback error:", error);
      alert("전송 중 문제가 발생했습니다. 다시 시도해 주세요.");
    } else {
      alert("소중한 의견이 팽팽이에게 전달되었습니다! 🐧");
      setFeedback('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-[2rem] w-full max-w-sm shadow-2xl">
        <h2 className="text-xl font-black mb-4">팽팽이와 함께 성장하기 🐧</h2>
        <p className="text-sm text-gray-500 font-bold mb-4">
          아이디어, 불편한 점, 고쳐야 할 것 등 무엇이든 좋아요!<br/>
          소중한 의견으로 팽팽이를 더 멋지게 키워주세요.
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value.slice(0, 200))}
          maxLength={200}
          className="w-full h-32 p-4 bg-penguin-gray rounded-xl font-bold text-base mb-2"
          placeholder="팽팽이를 위한 멋진 아이디어를 알려주세요!"
        />
        <div className="text-right text-xs text-gray-400 font-bold mb-4">{feedback.length}/200</div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">닫기</button>
          <button onClick={handleSubmit} className="flex-1 py-3 bg-penguin-yellow rounded-xl font-black">보내기</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
