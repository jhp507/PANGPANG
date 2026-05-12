import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import Management from "./pages/Management";
import Introduce from "./pages/Introduce";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import DbTest from "./pages/DbTest";
import LogoLink from "./components/LogoLink";
import FireButton from "./components/FireButton";
import TopButton from "./components/TopButton";
import FeedbackModal from "./components/FeedbackModal";

function AppContent() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "hot";

  const [dimensions, setDimensions] = useState({
    cols: typeof window !== "undefined" ? Math.ceil(window.innerWidth / 40) : 20,
    rows: typeof window !== "undefined" ? Math.ceil(window.innerHeight / 30) : 20,
  });
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        cols: Math.ceil(window.innerWidth / 40),
        rows: Math.ceil(window.innerHeight / 30),
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col text-penguin-black font-sans relative overflow-x-hidden">
        {/* 배경 영역 */}
        <img
          src="/pangpang_logo_gbr.png"
          alt="Floating Penguin Left"
          className="bg-penguin-left"
        />
        <img
          src="/pangpang_logo_gbr.png"
          alt="Floating Penguin Right"
          className="bg-penguin-right"
        />

        <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden">
          {/* 불꽃 동적 배치 */}
          <div className="flex w-full h-full">
            {Array.from({ length: dimensions.cols }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between h-full"
                style={{ width: "40px", flexShrink: 0 }}
              >
                {Array.from({ length: dimensions.rows }).map((_, j) => (
                  <span
                    key={j}
                    className="fire-emoji inline-block opacity-15"
                    style={{ animationDelay: `${Math.random() * 2}s` }}
                  >
                    🔥
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <header className="bg-penguin-black border-b border-white/10 sticky top-0 z-50 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <LogoLink />
            <nav className="flex gap-6">
              <Link
                to={`/introduce?filter=${filter}`}
                className="text-sm font-bold text-white/80 hover:text-penguin-yellow transition-colors"
              >
                소개
              </Link>
              <Link
                to={`/create?filter=${filter}`}
                className="text-sm font-bold text-white/80 hover:text-penguin-yellow transition-colors"
              >
                투표 만들기
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto py-6 px-4 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/poll/:id" element={<PollDetail />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/poll/:id/manage" element={<Management />} />
            <Route path="/db" element={<DbTest />} />
          </Routes>
        </main>

        <FireButton />
        <TopButton />

        <footer className="border-t py-8 mt-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="mb-6 px-6 py-2 bg-penguin-black text-penguin-yellow rounded-full text-sm font-black hover:scale-105 transition-transform"
            >
              팽팽이에게 의견 보내기 🐧
            </button>
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">
              © 2024 MOJI. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>

        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
