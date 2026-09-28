import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Navigation,
  Star,
  ShieldCheck,
  List,
  Layers,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Business, Category } from '../types';
import { CATEGORIES } from '../data/mockBusinesses';

interface MapDiscoveryScreenProps {
  businesses: Business[];
  onBack: () => void;
  onSelectBusiness: (business: Business) => void;
  onSwitchToList: () => void;
}

export const MapDiscoveryScreen: React.FC<MapDiscoveryScreenProps> = ({
  businesses,
  onBack,
  onSelectBusiness,
  onSwitchToList,
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(businesses[0] || null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchAreaQuery, setSearchAreaQuery] = useState('');

  const filteredPins = businesses.filter((b) => {
    if (activeCategory === 'all') return true;
    return b.category === activeCategory;
  });

  return (
    <div className="relative w-full h-[100dvh] flex flex-col bg-[#E5EEF7] overflow-hidden select-none">
      {/* Top Floating Controls */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-safe px-4 pb-2 bg-gradient-to-b from-white/90 via-white/80 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-2 mb-2.5">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#172033] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex-1 flex items-center bg-white rounded-2xl border border-slate-200 shadow-md px-3 py-2">
            <Search className="w-4 h-4 text-[#0757D9] mr-2" />
            <input
              type="text"
              value={searchAreaQuery}
              onChange={(e) => setSearchAreaQuery(e.target.value)}
              placeholder="Search in Chennai area..."
              className="w-full text-xs font-semibold text-[#172033] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={onSwitchToList}
            aria-label="Switch to List view"
            className="px-3 py-2 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-[#0757D9] active:scale-95 transition-transform"
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-xs whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-tizara-vibrant text-white'
                : 'bg-white text-[#667085] border border-slate-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-xs whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-tizara-vibrant text-white'
                  : 'bg-white text-[#667085] border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Mobile Map Canvas Simulation */}
      <div className="relative flex-1 w-full h-full bg-[#E5EEF7] overflow-hidden">
        {/* Vector Map Roads, Water & City Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cityGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D3E0EA" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cityGrid)" />
          
          {/* Bay of Bengal Coast Water Area on the right */}
          <path
            d="M 320 0 Q 340 250 310 500 T 330 900 L 450 900 L 450 0 Z"
            fill="#BEE3F8"
            opacity="0.6"
          />

          {/* Major Expressways / Salai */}
          <path d="M 0 180 Q 180 220 400 240" fill="none" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M 0 180 Q 180 220 400 240" fill="none" stroke="#F6AD55" strokeWidth="4" />
          
          <path d="M 120 0 Q 140 400 180 900" fill="none" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M 120 0 Q 140 400 180 900" fill="none" stroke="#CBD5E1" strokeWidth="6" />

          <path d="M 0 450 Q 200 480 350 430" fill="none" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M 0 450 Q 200 480 350 430" fill="none" stroke="#CBD5E1" strokeWidth="3" />

          {/* Green Parks */}
          <rect x="40" y="260" width="80" height="90" rx="16" fill="#C6F6D5" opacity="0.7" />
          <rect x="200" y="520" width="90" height="70" rx="16" fill="#C6F6D5" opacity="0.7" />
        </svg>

        {/* User Current Location Pulse Dot */}
        <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#008CFF]/20 animate-ping absolute" />
          <div className="w-5 h-5 rounded-full bg-[#008CFF] border-3 border-white shadow-lg flex items-center justify-center text-white" />
        </div>

        {/* Business Pins on Map */}
        {filteredPins.map((b, index) => {
          const isSelected = selectedBusiness?.id === b.id;
          
          // Coordinate offsets for realistic distribution across map
          const positions = [
            { top: '30%', left: '35%' },
            { top: '38%', left: '60%' },
            { top: '56%', left: '28%' },
            { top: '24%', left: '72%' },
            { top: '68%', left: '50%' },
            { top: '42%', left: '20%' },
            { top: '75%', left: '70%' },
            { top: '50%', left: '68%' },
          ];
          const pos = positions[index % positions.length];

          return (
            <div
              key={b.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer active:scale-90 transition-transform"
              onClick={() => setSelectedBusiness(b)}
            >
              <div
                className={`relative flex items-center gap-1 px-2.5 py-1 rounded-full shadow-lg transition-all ${
                  isSelected
                    ? 'bg-tizara-gradient text-white ring-4 ring-[#08D9F5]/40 scale-110'
                    : 'bg-white text-[#172033] hover:bg-slate-50'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#08D9F5]' : 'text-[#0757D9]'}`} />
                <span className="text-[11px] font-bold truncate max-w-[85px]">
                  {b.name.split(' ')[0]}
                </span>
                <span className={`text-[10px] font-bold px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'text-[#0757D9]'}`}>
                  ★ {b.rating}
                </span>

                {/* Pin pointer triangle */}
                <div
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 ${
                    isSelected ? 'border-t-[#071B52]' : 'border-t-white'
                  }`}
                />
              </div>
            </div>
          );
        })}

        {/* Re-center / GPS Trigger button */}
        <button
          type="button"
          onClick={() => {
            if (businesses[0]) setSelectedBusiness(businesses[0]);
          }}
          aria-label="Re-center location"
          className="absolute right-4 bottom-44 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-[#0757D9] active:scale-95 transition-transform"
        >
          <Navigation className="w-5 h-5 fill-[#0757D9]" />
        </button>
      </div>

      {/* Bottom Business Preview Card */}
      {selectedBusiness && (
        <div className="absolute bottom-4 left-4 right-4 z-30 pb-safe">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectBusiness(selectedBusiness)}
            onKeyDown={(e) => e.key === 'Enter' && onSelectBusiness(selectedBusiness)}
            className="w-full bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200 flex items-center gap-3 cursor-pointer active:scale-[0.99] transition-transform"
          >
            {/* Visual media */}
            <div className="w-18 h-18 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-base shadow-sm relative overflow-hidden bg-slate-800">
              {selectedBusiness.coverImage && (
                selectedBusiness.coverImage.startsWith('http') || selectedBusiness.coverImage.startsWith('/') ? (
                  <img
                    src={selectedBusiness.coverImage}
                    alt={selectedBusiness.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ background: selectedBusiness.coverImage }}
                  />
                )
              )}
              <div className="absolute inset-0 bg-black/20" />
              <span className="relative z-10 text-white font-bold text-xs bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                {selectedBusiness.logo}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-sm text-[#172033] truncate">
                  {selectedBusiness.name}
                </h4>
                {selectedBusiness.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008CFF] shrink-0" />
                )}
              </div>

              <p className="text-xs text-[#667085] truncate mt-0.5">
                {selectedBusiness.categoryName} · {selectedBusiness.locality}
              </p>

              <div className="flex items-center justify-between text-xs mt-2 pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1 font-bold text-[#0757D9]">
                  <Star className="w-3.5 h-3.5 fill-[#0757D9]" />
                  <span>{selectedBusiness.rating.toFixed(1)}</span>
                  <span className="text-[#667085] font-normal">
                    ({selectedBusiness.reviewCount})
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[#0757D9] font-bold text-xs">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
