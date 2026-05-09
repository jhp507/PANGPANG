import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import Management from "./pages/Management";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import DbTest from "./pages/DbTest";

function App() {
  const [dimensions, setDimensions] = useState({ 
    cols: typeof window !== 'undefined' ? Math.ceil(window.innerWidth / 40) : 20, 
    rows: typeof window !== 'undefined' ? Math.ceil(window.innerHeight / 30) : 20 
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        cols: Math.ceil(window.innerWidth / 40),
        rows: Math.ceil(window.innerHeight / 30)
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col text-penguin-black font-sans relative overflow-x-hidden">
        {/* 배경 영역 */}
        <div className="absolute inset-0 w-full h-full z-[-1] flex overflow-hidden">
          <img 
            src="/highpenguin_left.PNG" 
            alt="Floating Penguin Left" 
            className="bg-penguin-left"
          />
          <img 
            src="/highpenguin_right.PNG" 
            alt="Floating Penguin Right" 
            className="bg-penguin-right"
          />
          
          {/* 불꽃 동적 배치 */}
          {Array.from({ length: dimensions.cols }).map((_, i) => (
            <div key={i} className="flex flex-col justify-between h-full" style={{ width: '40px', flexShrink: 0 }}>
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
        
        <header className="bg-penguin-black border-b border-white/10 sticky top-0 z-50 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" onClick={() => window.location.reload()} className="flex items-center gap-2 group">
              <img 
                src="/pangpang_logo.png" 
                alt="PANGPANG 로고" 
                className="w-10 h-10 object-contain rounded-full group-hover:rotate-12 transition-transform duration-300" 
              />
              <h1 className="text-2xl font-black text-penguin-yellow tracking-tighter">
                PANGPANG
              </h1>
            </Link>
            <nav className="flex gap-6">
              <Link
                to="/"
                className="text-sm font-bold text-white/80 hover:text-penguin-yellow transition-colors"
              >
                홈
              </Link>
              <Link
                to="/create"
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
            <Route path="/poll/:id" element={<PollDetail />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/poll/:id/manage" element={<Management />} />
            <Route path="/db" element={<DbTest />} />
          </Routes>
        </main>

        <footer className="border-t py-8 mt-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
            © 2026 PANGPANG. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
