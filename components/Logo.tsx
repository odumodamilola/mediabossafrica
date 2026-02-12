
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Waveform Icon in Gradient Sphere */}
      <div className="relative w-14 h-14 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,0,160,0.4)]">
          <defs>
            <linearGradient id="sphereGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff00a0" />
              <stop offset="100%" stopColor="#810955" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#sphereGradient)" />
          {/* Subtle Waveform Background */}
          <path 
            d="M15 55C25 55 30 45 40 45C50 45 55 65 65 65C75 65 80 55 90 55" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            className="opacity-40"
          />
          {/* Sharp Jagged M from Image */}
          <path 
            d="M25 45L35 25L52 72L68 28L82 58" 
            stroke="white" 
            strokeWidth="11" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col select-none">
          <span className="font-sans font-black text-[2.4rem] leading-[0.9] tracking-tighter text-white">
            Mediaboss
          </span>
          <div className="flex justify-end pr-1 mt-[-2px]">
            <span className="font-sans font-black text-[2.1rem] leading-[0.9] tracking-tighter text-white flex items-center gap-[1px]">
              Afr
              <span className="relative flex flex-col items-center">
                i
                <span className="absolute -top-[4px] left-[1px] w-[6px] h-[6px] bg-brand-magenta rounded-full shadow-[0_0_6px_#ff00a0]" />
              </span>
              ca
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
