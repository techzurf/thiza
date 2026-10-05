import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  Volume2,
  VolumeX,
  Compass,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Business } from '../types';
import { BusinessCard } from '../components/common/BusinessCard';

interface FindScreenProps {
  businesses: Business[];
  favorites: string[];
  onBack: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
}

export const FindScreen: React.FC<FindScreenProps> = ({
  businesses,
  favorites,
  onBack,
  onToggleFavorite,
  onSelectBusiness,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const filteredBusinesses = businesses.filter((b) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        b.name.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.locality.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] flex flex-col text-[#172033] pb-16">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-brand font-extrabold text-xl text-[#071B52] leading-tight">
                Find on Tizara
              </h1>
              <span className="bg-[#EBF3FF] text-[#0757D9] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#0757D9]/20">
                DISCOVER
              </span>
            </div>
            <p className="text-xs text-[#667085] mt-0.5">
              Explore highlighted places, services and top local spots
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discovered businesses and places..."
            className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#172033] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0757D9] focus:bg-white transition-all shadow-inner"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 space-y-5">
        {/* Spotlight Video Card */}
        <section className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F0] bg-[#071B52]">
          <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/jevuqbu8/video/upload/v1790410373/Find_2.mp4"
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              className="w-full h-full object-cover"
            />

            {/* Video overlay controls */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 active:scale-95 transition-all shadow-md"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#08D9F5]" />
                )}
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 pointer-events-none">
              <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#08D9F5] animate-pulse" />
                <span className="text-[11px] font-semibold text-white tracking-wide">
                  Tizara Discovery Spotlight
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-b from-[#071B52] to-[#0B2568] text-white">
            <h2 className="font-brand font-bold text-base text-white flex items-center gap-1.5">
              <span>Find Verified Businesses & Local Services</span>
              <Sparkles className="w-4 h-4 text-[#08D9F5]" />
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Explore trusted partners across Chennai curated with high ratings, verified badges, and exclusive offers.
            </p>
          </div>
        </section>

        {/* Business Results */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">
              Showing {filteredBusinesses.length} verified listings
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredBusinesses.map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                isFavorite={favorites.includes(b.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={onSelectBusiness}
                variant="vertical"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
