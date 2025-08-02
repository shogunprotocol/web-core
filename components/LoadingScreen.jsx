'use client';

import { useSiteReady } from '../libs/site-ready-context';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const { isFullyLoaded, loadingProgress } = useSiteReady();
  const [fadeOut, setFadeOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isFullyLoaded) {
      // Comenzar fade out después de un breve delay
      setTimeout(() => {
        setFadeOut(true);
      }, 200);
      
      // Ocultar completamente después de la animación
      setTimeout(() => {
        setShouldRender(false);
      }, 800);
    }
  }, [isFullyLoaded]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${
        fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)',
      }}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #44FBDE 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, #44FBDE 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #44FBDE 0%, transparent 50%)
            `,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
      </div>

      <div className="relative text-center space-y-8 max-w-md px-8">
        {/* Logo/Title */}
        <div className="space-y-2">
          <div 
            className="text-basement-cyan text-6xl font-basement tracking-wider"
            style={{
              textShadow: '0 0 20px rgba(68, 251, 222, 0.5)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}
          >
            Shōgun
          </div>
          <div className="text-white/80 text-lg font-aeonik tracking-wide">
            AI-Powered DeFi Yield Optimization
          </div>
        </div>

        {/* Loading message */}
        <div className="space-y-4">
          <div className="text-basement-cyan/90 text-base font-aeonik">
            {loadingProgress < 30 && "Initializing AI ronin council..."}
            {loadingProgress >= 30 && loadingProgress < 60 && "Loading ancient wisdom..."}
            {loadingProgress >= 60 && loadingProgress < 90 && "Sharpening katanas..."}
            {loadingProgress >= 90 && "Ready for battle..."}
          </div>

          {/* Enhanced progress bar */}
          <div className="relative">
            <div className="w-64 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
              <div 
                className="h-full bg-gradient-to-r from-basement-cyan to-white transition-all duration-300 relative"
                style={{ width: `${loadingProgress}%` }}
              >
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    animation: 'shimmer 1.5s infinite',
                    transform: 'translateX(-100%)'
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-basement-cyan/70 mt-2">
              <span>0%</span>
              <span className="font-basement">{Math.round(loadingProgress)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Samurai saying */}
        <div className="text-white/60 text-sm font-aeonik italic border-l-2 border-basement-cyan/50 pl-4">
          "The path of the warrior is death. When it comes to either/or, there is only the quick choice of death."
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(68, 251, 222, 0.5); }
          to { text-shadow: 0 0 30px rgba(68, 251, 222, 0.8), 0 0 40px rgba(68, 251, 222, 0.3); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
} 