// src/pages/SplashScreen.jsx
import React, { useState, useEffect, useMemo } from 'react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Background pattern aman (quotes di-encode)
  const patternDataUri = useMemo(() => {
    const svg = `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              if (typeof onComplete === 'function') onComplete();
            }, 500);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 px-4">
      
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: patternDataUri,
          backgroundRepeat: 'repeat',
          // efek pulse sederhana (fallback jika tidak pakai plugin)
          animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        }}
        aria-hidden
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full">
        {/* Logo Container */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-1000 animate-bounce">
            {/* Chef Hat Icon */}
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12.5 1.5c-1.1 0-2.1.4-2.8 1.2-.6-.3-1.3-.4-2-.2-1.1.3-1.9 1.3-1.9 2.5 0 .2 0 .4.1.6-1.1.6-1.9 1.8-1.9 3.1V20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.7c0-1.3-.8-2.5-1.9-3.1.1-.2.1-.4.1-.6 0-1.2-.8-2.2-1.9-2.5-.7-.2-1.4-.1-2 .2-.7-.8-1.7-1.2-2.8-1.2zm0 2c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zM8.7 3.5c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm6.6 0c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zM18 8.7V20H6V8.7c0-.4.3-.7.7-.7h10.6c.4 0 .7.3.7.7z" />
            </svg>
          </div>

          {/* Floating Particles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '200ms' }} />
        </div>

        {/* App Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide">Resep</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-orange-100 -mt-2">Nusantara</h2>
          <p className="text-white/80 text-sm sm:text-base mt-3 font-light">
            Cita Rasa Indonesia di Ujung Jari
          </p>
        </div>

        {/* Loading Animation */}
        <div className="w-full max-w-xs">
          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-yellow-200 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-white/80 text-xs text-center mt-2">{progress}%</div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-xs sm:text-sm italic">
            "Warisan kuliner yang menggugah selera"
          </p>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
