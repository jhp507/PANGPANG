import React, { useEffect, useState } from 'react';

const HighFiveAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 1500); // Slightly shorter duration for a punchier feel
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-hidden pointer-events-none">
      <style>{`
        @keyframes impact {
          0% { opacity: 0; transform: scale(0.5); }
          20% { opacity: 1; transform: scale(1.2); }
          40% { opacity: 1; transform: scale(1); }
          70% { opacity: 0; transform: scale(1.5); }
          100% { opacity: 0; }
        }
        @keyframes flash {
          0% { opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 0; }
        }
        @keyframes circleSpread {
          0% { opacity: 0; transform: scale(0.2); }
          10% { opacity: 1; }
          50% { opacity: 0; transform: scale(2.5); }
          100% { opacity: 0; }
        }
      `}</style>
      
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Flash Effect */}
        <div className="absolute inset-0 bg-white z-50 pointer-events-none opacity-0" style={{ animation: 'flash 1.5s ease-out forwards' }} />
        
        {/* Impact Visual */}
        <div className="relative z-40 flex items-center justify-center pointer-events-none">
          <div className="text-white font-black text-8xl md:text-[12rem] italic uppercase tracking-tighter opacity-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" 
               style={{ 
                 animation: 'impact 1.5s cubic-bezier(0.17, 0.67, 0.16, 0.99) forwards',
                 textShadow: '8px 8px 0px #000'
               }}>
            PANG!
          </div>
          
          {/* Spark Circles */}
          <div className="absolute w-64 h-64 md:w-96 md:h-96 border-[12px] border-penguin-yellow rounded-full opacity-0" 
               style={{ animation: 'circleSpread 1.5s ease-out forwards' }} />
          <div className="absolute w-48 h-48 md:w-72 md:h-72 border-[6px] border-white rounded-full opacity-0" 
               style={{ animation: 'circleSpread 1.5s ease-out 0.1s forwards' }} />
        </div>
      </div>
    </div>
  );
};

export default HighFiveAnimation;
