import { useState } from "react";
import { useLocation } from "react-router-dom";
import HighFiveAnimation from "./HighFiveAnimation";

const FireButton = () => {
  const [showFire, setShowFire] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Home일 때는 + 버튼 위(bottom-28), 다른 페이지는 구석(bottom-8) */}
      <div
        className={`fixed ${isHome ? "bottom-28" : "bottom-8"} right-8 z-[100]`}
      >
        <button 
          onClick={() => setShowFire(true)}
          className="w-16 h-16 text-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          🔥
        </button>

      </div>
      {showFire && <HighFiveAnimation onComplete={() => setShowFire(false)} />}
    </>
  );
};

export default FireButton;
