'use client';

import { ChevronDown } from 'lucide-react';

interface ScrollArrowProps {
  targetId: string;
  className?: string;
}

export default function ScrollArrow({ targetId, className = "" }: ScrollArrowProps) {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <div 
        className="animate-bounce cursor-pointer"
        onClick={handleScroll}
      >
        <ChevronDown className="w-8 h-8 text-slate-400 hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );
} 