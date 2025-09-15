// src/pages/SplashScreen.jsx
import React, { useState, useEffect, useMemo } from 'react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  
  const patternDataUri = useMemo(() => {
    const svg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#3B82F6" fill-opacity="0.05"><rect x="0" y="0" width="20" height="20"/><rect x="20" y="20" width="20" height="20"/></g></g></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                if (typeof onComplete === 'function') onComplete();
              }, 100);
            }, 600);
          }, 800);
          return 100;
        }
        const nextProgress = prev + 6;
        return nextProgress > 100 ? 100 : nextProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 transition-all duration-600 ease-out ${
        !fadeIn ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${
        fadeOut ? 'opacity-0 scale-105' : ''
      }`}
    >
      
      <div
        className={`absolute inset-0 opacity-30 transition-opacity duration-800 ${
          fadeOut ? 'opacity-0' : ''
        }`}
        style={{
          backgroundImage: patternDataUri,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden
      />

      {/* Floating Elements */}
      <div className={`absolute top-16 sm:top-20 left-6 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200/30 rounded-full blur-2xl sm:blur-3xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} />
      <div className={`absolute bottom-28 sm:bottom-32 right-8 sm:right-12 w-20 sm:w-24 h-20 sm:h-24 bg-blue-300/20 rounded-full blur-xl sm:blur-2xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '1s' }} />
      <div className={`absolute top-1/3 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 bg-indigo-200/20 rounded-full blur-lg sm:blur-xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '2.5s' }} />
      <div className={`absolute bottom-1/4 left-4 sm:left-6 w-16 sm:w-20 h-16 sm:h-20 bg-blue-100/40 rounded-full blur-xl sm:blur-2xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '3s' }} />
      
      <div className={`relative z-10 flex flex-col items-center justify-center max-w-xs sm:max-w-lg w-full transition-all duration-800 ${
        !fadeIn ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      } ${
        fadeOut ? 'opacity-0 -translate-y-8' : ''
      }`}>
        
        {/* Logo Container */}
        <div className="mb-10 sm:mb-16 relative group">
          <div className="w-28 h-28 sm:w-32 md:w-40 sm:h-32 md:h-40 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl shadow-blue-500/10 transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
            <img 
              src="/LOGORN.png" 
              alt="Resep Nusantara Logo"
              className="w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 object-contain filter drop-shadow-lg transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Decorative Particles */}
          <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-blue-400 rounded-full animate-ping opacity-75" />
          <div className="absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300 rounded-full animate-ping opacity-75" style={{ animationDelay: '300ms' }} />
          <div className="absolute top-1/4 -right-2 sm:-right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 -left-2 sm:-left-3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-blue-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="text-center mb-12 sm:mb-16 px-2">
          <h1 className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-1 sm:mb-2 tracking-tight leading-none transform transition-all duration-1000 hover:scale-105 ${
            !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            Resep
          </h1>
          <h2 className={`text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent -mt-2 sm:-mt-3 tracking-wide transform transition-all duration-1000 hover:scale-105 ${
            !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`} style={{ transitionDelay: '200ms' }}>
            Nusantara
          </h2>

          <div className={`relative mt-4 sm:mt-6 mb-6 sm:mb-8 transition-all duration-1000 ${
            !fadeIn ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full animate-pulse" />
            <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-400 mx-auto mt-1 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '500ms' }} />
            <div className="w-6 sm:w-8 h-0.5 bg-blue-200 mx-auto mt-1 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <p className={`text-slate-600 text-sm xs:text-base sm:text-lg font-medium leading-relaxed max-w-xs mx-auto transform transition-all duration-1000 hover:text-slate-700 ${
            !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`} style={{ transitionDelay: '600ms' }}>
            Warisan Kuliner Indonesia<br />
            <span className="text-xs xs:text-sm font-normal text-slate-500">Tradisi Rasa Nusantara</span>
          </p>
        </div>

        {/* Loading Animation */}
        <div className={`w-full max-w-xs sm:max-w-sm transition-all duration-1000 ${
          !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="relative mb-6 sm:mb-8">
            <div className="w-full h-3 sm:h-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out shadow-sm relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse opacity-50" />
                {progress < 100 && (
                  <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-transparent to-white/40 animate-pulse" />
                )}
              </div>
            </div>
           
            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <span className="text-slate-600 text-xs xs:text-sm font-semibold">
                {progress < 100 ? 'Memuat aplikasi...' : 'Siap digunakan!'}
              </span>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-blue-600 text-xs xs:text-sm font-bold">{Math.min(progress, 100)}%</span>
                <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full ${
                  progress < 100 ? 'animate-ping' : 'animate-pulse bg-green-500'
                }`} />
              </div>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-md sm:shadow-lg transition-all duration-500 ${
              progress < 100 ? 'bg-blue-400 animate-bounce' : 'bg-green-400 animate-pulse'
            }`} style={{ animationDuration: '1s' }} />
            <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-md sm:shadow-lg transition-all duration-500 ${
              progress < 100 ? 'bg-blue-500 animate-bounce' : 'bg-green-500 animate-pulse'
            }`} style={{ animationDelay: '200ms', animationDuration: '1s' }} />
            <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full shadow-md sm:shadow-lg transition-all duration-500 ${
              progress < 100 ? 'bg-blue-600 animate-bounce' : 'bg-green-600 animate-pulse'
            }`} style={{ animationDelay: '400ms', animationDuration: '1s' }} />
            <div className={`w-2 sm:w-2 h-2 sm:h-2 rounded-full shadow-sm sm:shadow-md opacity-75 transition-all duration-500 ${
              progress < 100 ? 'bg-indigo-500 animate-bounce' : 'bg-green-500 animate-pulse'
            }`} style={{ animationDelay: '600ms', animationDuration: '1.2s' }} />
            <div className={`w-2 sm:w-2 h-2 sm:h-2 rounded-full shadow-sm sm:shadow-md opacity-50 transition-all duration-500 ${
              progress < 100 ? 'bg-indigo-600 animate-bounce' : 'bg-green-600 animate-pulse'
            }`} style={{ animationDelay: '800ms', animationDuration: '1.2s' }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-sm border-t border-white/20 transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`} />
      
      <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center transition-all duration-1000 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } ${
        fadeOut ? 'opacity-0 translate-y-4' : ''
      }`} style={{ transitionDelay: '1000ms' }}>

        <div className="flex justify-center space-x-0.5 sm:space-x-1 mb-2 sm:mb-3">
          <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse" />
          <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
        </div>
        
        <p className="text-slate-500 text-xs xs:text-sm font-medium tracking-wide xs:tracking-widest mb-1.5 sm:mb-2 transform transition-all duration-500 hover:text-slate-600 hover:tracking-wider px-2">
          Versi 1.0.0 - © 2025 Resep Nusantara
        </p>
        
        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full animate-pulse opacity-80" />
        
        <div className="absolute -top-1.5 sm:-top-2 -left-3 sm:-left-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-blue-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute -top-0.5 sm:-top-1 -right-3 sm:-right-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-indigo-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '2.5s' }} />
      </div>
    </div>
  );
}