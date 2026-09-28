import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
  onContinue?: () => void;
  onExploreDirectly?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  onContinue,
  onExploreDirectly,
}) => {
  // Animation phases:
  // 'initial': mounted with starting values (scale ~85%, opacity 0)
  // 'entering': smooth fade-in and scale to 100%, subtle glow entrance
  // 'holding': logo stable, soft ambient glow
  // 'exiting': smooth fade transition revealing the Tizara Home screen
  const [phase, setPhase] = useState<'initial' | 'entering' | 'holding' | 'exiting'>('initial');

  useEffect(() => {
    // 1. Trigger smooth entrance shortly after mount
    const enterTimer = setTimeout(() => {
      setPhase('entering');
    }, 40);

    // 2. Entrance finishes around 750ms -> hold stable until 1650ms
    const holdTimer = setTimeout(() => {
      setPhase('holding');
    }, 750);

    // 3. Initiate subtle fade-out transition to the Home screen at 1650ms (500ms duration)
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 1650);

    // 4. Conclude splash screen at 2150ms (~2.15 seconds, well within the 1.8–2.5s target)
    const completeTimer = setTimeout(() => {
      onFinish?.();
      onExploreDirectly?.();
      onContinue?.();
    }, 2150);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onFinish, onExploreDirectly, onContinue]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden select-none transition-opacity duration-500 ease-out ${
        phase === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        height: '100dvh',
        width: '100vw',
      }}
      aria-label="Tizara Splash Screen"
    >
      {/* Centered Logo Presentation */}
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* Subtle Blue/Cyan Brand Glow behind the logo */}
        <div
          className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full pointer-events-none transition-all duration-1000 ease-out ${
            phase === 'initial'
              ? 'opacity-0 scale-75'
              : phase === 'entering'
              ? 'opacity-90 scale-100'
              : phase === 'holding'
              ? 'opacity-100 scale-105'
              : 'opacity-40 scale-105'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(8, 217, 245, 0.28) 0%, rgba(0, 140, 255, 0.16) 42%, rgba(255, 255, 255, 0) 72%)',
            filter: 'blur(32px)',
            transform: 'translateZ(0)',
          }}
        />

        {/* Official Tizara Logo - Smooth 85% -> 100% scale and fade */}
        <div
          className={`relative z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'initial'
              ? 'opacity-0 scale-[0.85]'
              : 'opacity-100 scale-100'
          }`}
          style={{
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src="https://res.cloudinary.com/jevuqbu8/image/upload/v1790571797/Tizara_Logo.png"
            alt="Tizara"
            className="w-48 h-48 sm:w-56 sm:h-56 max-w-[70vw] max-h-[70vw] object-contain drop-shadow-sm select-none pointer-events-none"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
};
