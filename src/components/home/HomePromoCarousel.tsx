import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

const CAROUSEL_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    image: 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790860621/Discover_Local_with_Tizara.png',
    alt: 'Discover Local with Tizara',
  },
  {
    id: 'slide-2',
    image: 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790860996/ASINMART_Trendy_Fashion_Banner_1.png',
    alt: 'ASINMART Trendy Fashion Banner',
  },
  {
    id: 'slide-3',
    image: 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790861478/ASIN_Lifestyle_T-Shirt_Collection.png',
    alt: 'ASIN Lifestyle T-Shirt Collection',
  },
];

export const HomePromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto transition every 4.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse drag handlers for desktop / testing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    isDragging.current = true;
    touchStartX.current = e.clientX;
    touchEndX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      handleTouchEnd();
      isDragging.current = false;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleTouchEnd();
      isDragging.current = false;
    }
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-[#E2E8F0]/80 bg-[#F1F5F9] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="region"
      aria-label="Promotional Image Carousel"
    >
      {/* Slides Container */}
      <div
        className="flex w-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
      >
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-full flex-none relative aspect-[16/7.5] sm:aspect-[21/9] min-h-[140px] sm:min-h-[180px] overflow-hidden"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center pointer-events-none block"
            />

            {/* Optional Slide Text Overlay if defined */}
            {(slide.title || slide.subtitle || slide.tag) && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3.5 right-3.5 sm:bottom-4 sm:left-5 sm:right-5 z-10 pointer-events-none">
                  {slide.tag && (
                    <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white bg-[#0757D9]/85 backdrop-blur-xs px-2 py-0.5 rounded-md mb-1 shadow-2xs">
                      {slide.tag}
                    </span>
                  )}
                  {slide.title && (
                    <h3 className="font-brand font-bold text-xs sm:text-base text-white line-clamp-1 drop-shadow-md">
                      {slide.title}
                    </h3>
                  )}
                  {slide.subtitle && (
                    <p className="text-[10px] sm:text-xs text-white/90 line-clamp-1 mt-0.5 drop-shadow-sm font-medium">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Indicator Dots */}
      <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-2 py-1 rounded-full pointer-events-auto">
        {CAROUSEL_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive ? 'w-5 bg-[#08D9F5]' : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
