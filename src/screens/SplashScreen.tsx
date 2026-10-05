import React, { useRef, useEffect, useCallback } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
  onContinue?: () => void;
  onExploreDirectly?: () => void;
}

const SPLASH_VIDEO_URL =
  'https://res.cloudinary.com/jevuqbu8/video/upload/v1790858844/Tizara_App_Splash_Screen_1.mp4';

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  onContinue,
  onExploreDirectly,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef<boolean>(false);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish?.();
    onExploreDirectly?.();
    onContinue?.();
  }, [onFinish, onContinue, onExploreDirectly]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      video.defaultMuted = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry muted immediately for Android WebView / mobile browsers
          video.muted = true;
          video.play().catch(() => {
            handleFinish();
          });
        });
      }
    }

    // Safety fallback for Android WebView if video fails or is blocked
    const safetyTimeout = setTimeout(() => {
      handleFinish();
    }, 6000);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [handleFinish]);

  return (
    <div
      className="fixed inset-0 z-50 w-full h-[100dvh] bg-black overflow-hidden select-none flex items-center justify-center pointer-events-none"
      aria-label="Tizara Splash Screen"
    >
      <video
        ref={videoRef}
        src={SPLASH_VIDEO_URL}
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        controls={false}
        loop={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onEnded={handleFinish}
        onError={handleFinish}
        className="w-full h-full object-cover object-center pointer-events-none block"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};
