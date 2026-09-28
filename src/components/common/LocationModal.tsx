import React from 'react';
import { X, MapPin, Check, Navigation } from 'lucide-react';
import { CITIES } from '../../data/mockBusinesses';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0757D9]" />
            <h3 className="font-bold text-base text-[#172033]">
              Select Your Location
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Location auto-detect button */}
        <div className="p-4 border-b border-slate-100 bg-[#F5F8FC]">
          <button
            type="button"
            onClick={() => {
              onSelectCity('Chennai, Tamil Nadu');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-[#008CFF]/30 text-left shadow-xs active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E8F5FF] flex items-center justify-center text-[#008CFF]">
                <Navigation className="w-4 h-4 fill-[#008CFF]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0757D9]">
                  Use Current GPS Location
                </p>
                <p className="text-[11px] text-[#667085]">
                  Chennai, Tamil Nadu
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#008CFF] bg-[#E8F5FF] px-2 py-0.5 rounded-full">
              GPS
            </span>
          </button>
        </div>

        {/* City List */}
        <div className="p-2 max-h-72 overflow-y-auto">
          <p className="px-3 py-2 text-[11px] font-bold text-[#667085] uppercase tracking-wider">
            Popular Cities
          </p>
          {CITIES.map((city) => {
            const isSelected = selectedCity === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-colors ${
                  isSelected ? 'bg-[#EBF3FF] text-[#0757D9]' : 'hover:bg-slate-50 text-[#172033]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#0757D9]' : 'text-slate-400'}`} />
                  <span className="text-sm font-semibold">{city}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#0757D9] stroke-[2.5]" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 pb-safe">
          <p className="text-[11px] text-center text-[#667085]">
            Businesses and offers will be tailored to your selected city.
          </p>
        </div>
      </div>
    </div>
  );
};
