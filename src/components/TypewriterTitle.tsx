import React, { useState, useEffect } from "react";

const TypewriterTitle = () => {
  const [text, setText] = useState("");
  const fullText = "지금, 당신의 한 표로 팽팽한 승부를 가려보세요!";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="text-center py-6 mb-4">
      <h2 className="text-base md:text-2xl font-black text-penguin-black italic break-keep">
        {text}
        <span className="animate-pulse">|</span>
      </h2>
      <p className="text-gray-500 font-bold mt-2 text-xs md:text-base">
        세상의 모든 논쟁, 1초 만에 종결하는 팡팡 투표! 🐧
      </p>
    </div>
  );
};

export default TypewriterTitle;
