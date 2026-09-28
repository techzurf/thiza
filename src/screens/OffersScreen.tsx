import React, { useState } from 'react';
import { Tag, Sparkles, X, Check, Copy, Calendar, ArrowRight } from 'lucide-react';
import { BusinessOffer, Business } from '../types';
import { ALL_OFFERS } from '../data/mockBusinesses';
import { OfferCard } from '../components/common/OfferCard';

interface OffersScreenProps {
  offers?: BusinessOffer[];
  businesses: Business[];
  onSelectBusiness: (business: Business) => void;
  selectedOfferModal: BusinessOffer | null;
  onSetSelectedOfferModal: (offer: BusinessOffer | null) => void;
}

export const OffersScreen: React.FC<OffersScreenProps> = ({
  offers = ALL_OFFERS,
  businesses,
  onSelectBusiness,
  selectedOfferModal,
  onSetSelectedOfferModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'weekend' | 'dining' | 'shopping'>('all');

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredOffers = offers.filter((o) => {
    if (filterType === 'weekend') return o.title.toLowerCase().includes('weekend');
    if (filterType === 'dining') return o.category === 'restaurants';
    if (filterType === 'shopping') return o.category === 'shopping';
    return true;
  });

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              Deals & Offers
            </h1>
            <p className="text-xs text-[#667085]">
              Verified exclusive discounts from top local brands
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0757D9]">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        {/* Quick Filter tabs */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Deals' },
            { id: 'weekend', label: 'Weekend Specials' },
            { id: 'dining', label: 'Dining Offers' },
            { id: 'shopping', label: 'Fashion & Retail' },
          ].map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#0757D9] text-white shadow-xs'
                    : 'bg-[#F5F8FC] text-[#667085] hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main List */}
      <main className="p-4 flex flex-col gap-4">
        {filteredOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onViewOffer={onSetSelectedOfferModal}
            onSelectBusiness={(id) => {
              const b = businesses.find((x) => x.id === id);
              if (b) onSelectBusiness(b);
            }}
          />
        ))}
      </main>

      {/* Offer Detail / Claim Bottom Sheet Modal */}
      {selectedOfferModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 pb-safe"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header Banner */}
            <div className="bg-tizara-gradient p-5 text-white relative">
              <button
                type="button"
                onClick={() => onSetSelectedOfferModal(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#08D9F5] bg-white/10 px-3 py-1 rounded-full mb-2">
                {selectedOfferModal.discount}
              </span>

              <h3 className="font-brand font-extrabold text-xl text-white">
                {selectedOfferModal.title}
              </h3>

              <p className="text-xs text-white/80 mt-1">
                Offered by <strong className="text-white">{selectedOfferModal.businessName}</strong>
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                  Offer Details
                </h4>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  {selectedOfferModal.description}
                </p>
              </div>

              {/* Coupon Code Box */}
              <div className="bg-[#F5F8FC] border border-[#008CFF]/30 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#667085] uppercase">
                    Your Promo Code
                  </span>
                  <p className="font-mono font-extrabold text-base text-[#0757D9] tracking-wider">
                    {selectedOfferModal.code}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(selectedOfferModal.code)}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center gap-1.5 text-xs font-bold text-[#0757D9] active:scale-95 transition-transform"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                  Terms & Conditions
                </h4>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  {selectedOfferModal.terms}
                </p>
              </div>

              {/* Action: Visit Business Profile */}
              <button
                type="button"
                onClick={() => {
                  const b = businesses.find((x) => x.id === selectedOfferModal.businessId);
                  onSetSelectedOfferModal(null);
                  if (b) onSelectBusiness(b);
                }}
                className="w-full py-3.5 rounded-xl bg-tizara-vibrant text-white font-brand font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0757D9]/20 active:scale-[0.98] transition-transform"
              >
                <span>Visit {selectedOfferModal.businessName}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
