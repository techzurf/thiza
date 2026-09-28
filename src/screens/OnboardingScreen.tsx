import React, { useState } from 'react';
import { Compass, Layers, PhoneCall, ArrowRight, Check } from 'lucide-react';
import { TizaraLogo } from '../components/common/TizaraLogo';

interface OnboardingScreenProps {
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Discover Businesses Around You',
      description: 'Find trusted businesses, shops, professionals and services near you with real ratings.',
      icon: Compass,
      tag: 'LOCAL DISCOVERY',
      accentColor: '#0757D9',
      gradient: 'from-[#071B52] to-[#0757D9]',
    },
    {
      title: 'Everything You Need, In One Place',
      description: 'Explore businesses, services, verified offers, genuine ratings, and customer reviews.',
      icon: Layers,
      tag: 'ALL-IN-ONE HUB',
      accentColor: '#008CFF',
      gradient: 'from-[#0757D9] to-[#008CFF]',
    },
    {
      title: 'Connect With Businesses',
      description: 'Call, message via WhatsApp, enquire online or navigate directly to businesses with ease.',
      icon: PhoneCall,
      tag: 'SEAMLESS CONTACT',
      accentColor: '#08D9F5',
      gradient: 'from-[#008CFF] to-[#08D9F5]',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col justify-between bg-white text-[#172033] px-6 py-6 select-none">
      {/* Top Bar */}
      <div className="pt-safe flex items-center justify-between">
        <TizaraLogo variant="horizontal" size="sm" />
        
        {currentSlide < slides.length - 1 ? (
          <button
            type="button"
            onClick={onFinish}
            className="text-xs font-semibold text-[#667085] hover:text-[#0757D9] py-1 px-2.5 rounded-lg active:scale-95 transition-colors"
          >
            Skip
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Slide Illustration / Visual Art */}
      <div className="my-auto flex flex-col items-center text-center max-w-sm mx-auto">
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Outer glowing animated rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0757D9]/10 via-[#008CFF]/10 to-[#08D9F5]/20 blur-xl animate-pulse" />
          
          {/* Main Visual Circle */}
          <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#F0F6FF] to-[#E6FAFD] border border-[#08D9F5]/30 flex flex-col items-center justify-center p-6 shadow-xl shadow-[#0757D9]/5">
            <div className="w-20 h-20 rounded-2xl bg-tizara-gradient flex items-center justify-center text-white shadow-lg shadow-[#0757D9]/30">
              <IconComponent className="w-10 h-10 stroke-[2]" />
            </div>

            {/* Decorative mini badges */}
            <div className="absolute -top-3 -right-3 bg-white px-2.5 py-1 rounded-full shadow-md border border-[#E2E8F0] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold text-[#071B52]">Verified</span>
            </div>

            <div className="absolute -bottom-2 -left-2 bg-white px-3 py-1 rounded-full shadow-md border border-[#E2E8F0] flex items-center gap-1">
              <span className="text-[10px] font-bold text-[#008CFF]">Tizara</span>
            </div>
          </div>
        </div>

        {/* Tag */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0757D9] bg-[#E8F5FF] px-3 py-1 rounded-full mb-3">
          {slide.tag}
        </span>

        {/* Title */}
        <h2 className="font-brand font-extrabold text-2xl text-[#172033] leading-snug">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-[#667085] mt-3 leading-relaxed max-w-xs">
          {slide.description}
        </p>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="pb-safe flex flex-col gap-6 max-w-sm mx-auto w-full">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 bg-tizara-vibrant'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleNext}
          className="w-full h-13 rounded-2xl bg-tizara-gradient text-white font-brand font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0757D9]/25 hover:opacity-95 active:scale-[0.98] transition-all"
        >
          {currentSlide === slides.length - 1 ? (
            <>
              <span>Get Started</span>
              <Check className="w-5 h-5 stroke-[2.5]" />
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
