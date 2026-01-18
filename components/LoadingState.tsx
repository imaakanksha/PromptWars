
import React, { useState, useEffect } from 'react';

const messages = [
  "Sharpening the knives...",
  "Consulting the recipe books...",
  "Finding the perfect balance of flavors...",
  "Calculating the optimal cleanup strategy...",
  "Organizing the prep station...",
  "Preheating the virtual oven..."
];

const LoadingState: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-orange-100 rounded-full animate-spin border-t-orange-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-utensils text-2xl text-orange-500 animate-bounce"></i>
        </div>
      </div>
      <h3 className="text-xl font-serif text-stone-800 mb-2">Chef is thinking...</h3>
      <p className="text-stone-400 italic text-sm transition-opacity duration-500 px-4 text-center">
        {messages[msgIdx]}
      </p>
      
      <div className="mt-12 w-full max-w-md bg-stone-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-orange-500 h-full animate-[progress_15s_ease-in-out_infinite]" style={{ width: '0%' }}></div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          10% { width: 30%; }
          40% { width: 50%; }
          70% { width: 85%; }
          100% { width: 95%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
