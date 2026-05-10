import { useState } from "react";
import { useLocation } from "react-router-dom";
import HighFiveAnimation from "./HighFiveAnimation";

const TopButton = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`fixed ${isHome ? "bottom-20" : "bottom-4"} right-4 z-20`}
      >
        <button
          onClick={scrollToTop}
          className="w-16 h-16 text-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          ⬆️
        </button>
      </div>
    </>
  );
};

export default TopButton;
