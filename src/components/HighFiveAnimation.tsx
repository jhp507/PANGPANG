import React, { useEffect, useState } from 'react';

const HighFiveAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-hidden pointer-events-none h-[100dvh]">
      <style>{`
        @keyframes penguinLeft {
          0% { transform: translateX(-150%) rotate(-20deg); opacity: 0; }
          20% { opacity: 1; }
          45% { transform: translateX(-5%) rotate(-5deg); }
          50% { transform: translateX(0) rotate(0); }
          100% { transform: translateX(0) rotate(0); }
        }
        @keyframes penguinRight {
          0% { transform: translateX(150%) rotate(20deg); opacity: 0; }
          20% { opacity: 1; }
          45% { transform: translateX(5%) rotate(5deg); }
          50% { transform: translateX(0) rotate(0); }
          100% { transform: translateX(0) rotate(0); }
        }
        @keyframes impact {
          0%, 48% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
          60% { opacity: 1; transform: scale(1); }
          85% { opacity: 0; transform: scale(1.5); }
          100% { opacity: 0; }
        }
        @keyframes flash {
          0%, 48% { opacity: 0; }
          50% { opacity: 1; }
          70% { opacity: 0; }
        }
        @keyframes circleSpread {
          0%, 48% { opacity: 0; transform: scale(0.2); }
          50% { opacity: 1; }
          80% { opacity: 0; transform: scale(2.5); }
          100% { opacity: 0; }
        }
        @keyframes fadeOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Flash Effect */}
        <div className="absolute inset-0 bg-white z-50 pointer-events-none opacity-0" style={{ animation: 'flash 2s ease-out forwards' }} />
        
        {/* Left Penguin: Positioned so its right edge is at the center line */}
        <div className="absolute right-1/2 z-10 w-40 h-56 md:w-64 md:h-80" 
             style={{ 
               animation: 'penguinLeft 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, fadeOut 2s forwards' 
             }}>
          <img src="/highpenguin_left.PNG" alt="Penguin Left" className="w-full h-full object-contain object-right" />
        </div>

        {/* Right Penguin: Positioned so its left edge is at the center line */}
        <div className="absolute left-1/2 z-10 w-40 h-56 md:w-64 md:h-80" 
             style={{ 
               animation: 'penguinRight 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, fadeOut 2s forwards' 
             }}>
          <img src="/highpenguin_right.PNG" alt="Penguin Right" className="w-full h-full object-contain object-left" />
        </div>

        {/* Impact Visual */}
        <div className="relative z-40 flex items-center justify-center pointer-events-none">
          <div className="text-white font-black text-7xl md:text-[10rem] italic uppercase tracking-tighter opacity-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" 
               style={{ 
                 animation: 'impact 2s cubic-bezier(0.17, 0.67, 0.16, 0.99) forwards',
                 textShadow: '6px 6px 0px #000'
               }}>
            PANG!
          </div>
          
          {/* Spark Circles */}
          <div className="absolute w-64 h-64 md:w-96 md:h-96 border-[10px] border-penguin-yellow rounded-full opacity-0" 
               style={{ animation: 'circleSpread 2s ease-out forwards' }} />
          <div className="absolute w-48 h-48 md:w-72 md:h-72 border-[4px] border-white rounded-full opacity-0" 
               style={{ animation: 'circleSpread 2s ease-out 0.05s forwards' }} />
        </div>
      </div>
    </div>
  );
};

export default HighFiveAnimation;
