
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-4xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-200">
            <i className="fas fa-hat-chef text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800 tracking-tight">ChefStep</h1>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold leading-none">Personal Micro-Planner</p>
          </div>
        </div>
        <div className="hidden sm:flex gap-6 text-sm font-medium text-stone-500">
          <span className="hover:text-orange-500 cursor-pointer transition-colors">How it works</span>
          <span className="hover:text-orange-500 cursor-pointer transition-colors">Kitchen Tips</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
