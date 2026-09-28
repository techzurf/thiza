import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Phone,
  MessageSquare,
  Navigation,
  Send,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  Globe,
  Mail,
  Tag,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { Business, BusinessOffer } from '../types';
import { OfferCard } from '../components/common/OfferCard';

interface BusinessProfileScreenProps {
  business: Business;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onShare: (business: Business) => void;
  onEnquire: (business: Business) => void;
  onSelectOffer: (offer: BusinessOffer) => void;
}

export const BusinessProfileScreen: React.FC<BusinessProfileScreenProps> = ({
  business,
  isFavorite,
  onBack,
  onToggleFavorite,
  onShare,
  onEnquire,
  onSelectOffer,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'offers' | 'info' | 'reviews'>('about');

  const handleCall = () => {
    window.location.href = `tel:${business.phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${business.name}, I found your business on Tizara and would like to enquire about your services.`);
    window.open(`https://api.whatsapp.com/send?phone=${business.whatsapp.replace(/[^0-9]/g, '')}&text=${text}`, '_blank');
  };

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name} ${business.address} ${business.city}`)}`, '_blank');
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Cover Banner */}
      <div className="relative h-64 sm:h-72 w-full flex flex-col justify-between p-4 overflow-hidden bg-slate-900">
        {business.coverImage && (
          business.coverImage.startsWith('http') || business.coverImage.startsWith('/') ? (
            <img
              src={business.coverImage}
              alt={business.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: business.coverImage }}
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B52]/95 via-[#071B52]/40 to-black/50" />

        {/* Top Floating Action Controls */}
        <div className="relative z-10 pt-safe flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#172033] shadow-md active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onShare(business)}
              aria-label="Share business"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#172033] shadow-md active:scale-95 transition-transform"
            >
              <Share2 className="w-5 h-5 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={(e) => onToggleFavorite(business.id, e)}
              aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#172033] shadow-md active:scale-95 transition-transform"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-[#0757D9] text-[#0757D9]' : 'text-slate-700'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Business Title Overlay inside Banner */}
        <div className="relative z-10 flex items-end gap-3.5 mb-2">
          {/* Business Logo Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-white shadow-xl flex items-center justify-center font-brand font-extrabold text-xl text-[#071B52] shrink-0">
            {business.logo}
          </div>

          <div className="min-w-0 flex-1 text-white">
            <div className="flex items-center gap-1.5">
              <h1 className="font-brand font-extrabold text-xl sm:text-2xl text-white truncate">
                {business.name}
              </h1>
              {business.isVerified && (
                <ShieldCheck className="w-5 h-5 text-[#08D9F5] shrink-0" />
              )}
            </div>
            <p className="text-xs text-white/80 font-medium truncate">
              {business.categoryName} · {business.locality}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Meta Details Card */}
      <div className="px-4 -mt-3 relative z-20">
        <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#E8F5FF] text-[#0757D9] px-2.5 py-1 rounded-lg font-bold text-sm">
                <Star className="w-4 h-4 fill-[#0757D9]" />
                <span>{business.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-[#667085] font-medium">
                ({business.reviewCount} verified reviews)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">
                {business.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#667085] mt-2.5 line-clamp-2">
            {business.tagline}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS (Call, WhatsApp, Directions, Enquire) */}
      <div className="px-4 mt-3">
        <div className="grid grid-cols-4 gap-2">
          {/* Call */}
          <button
            type="button"
            onClick={handleCall}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs active:scale-95 transition-transform"
          >
            <div className="w-9 h-9 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0757D9] mb-1">
              <Phone className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-[#172033]">Call</span>
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs active:scale-95 transition-transform"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6FAFD] flex items-center justify-center text-[#08D9F5] mb-1">
              <MessageSquare className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-[#172033]">WhatsApp</span>
          </button>

          {/* Directions */}
          <button
            type="button"
            onClick={handleDirections}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs active:scale-95 transition-transform"
          >
            <div className="w-9 h-9 rounded-full bg-[#E8F5FF] flex items-center justify-center text-[#008CFF] mb-1">
              <Navigation className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-[#172033]">Directions</span>
          </button>

          {/* Enquire */}
          <button
            type="button"
            onClick={() => onEnquire(business)}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-tizara-vibrant text-white shadow-md shadow-[#0757D9]/20 active:scale-95 transition-transform"
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
              <Send className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold">Enquire</span>
          </button>
        </div>
      </div>

      {/* Profile Section Tabs */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
          {(
            [
              { id: 'about', label: 'About' },
              { id: 'services', label: `Services (${business.services.length})` },
              { id: 'offers', label: `Offers (${business.offers.length})` },
              { id: 'info', label: 'Business Info' },
              { id: 'reviews', label: `Reviews (${business.reviews.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                activeTab === tab.id
                  ? 'border-[#0757D9] text-[#0757D9]'
                  : 'border-transparent text-[#667085] hover:text-[#172033]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="p-4 flex flex-col gap-4">
        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <h3 className="font-brand font-bold text-sm text-[#172033] mb-2">
                About {business.name}
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                {business.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-[#172033]">
                    Verified Identity
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-[#172033]">
                    Genuine Customer Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Photo Gallery */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <h3 className="font-brand font-bold text-sm text-[#172033] mb-3">
                Photos & Workspace
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {business.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    className="h-20 rounded-xl relative overflow-hidden bg-slate-100 flex items-center justify-center shadow-xs"
                  >
                    {item.startsWith('http') || item.startsWith('/') ? (
                      <img
                        src={item}
                        alt={`${business.name} workspace photo ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover active:scale-105 transition-transform"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: item }}
                      >
                        <span>{business.name.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="flex flex-col gap-3">
            {business.services.map((svc) => (
              <div
                key={svc.id}
                className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-start justify-between gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-[#172033]">{svc.name}</h4>
                  <p className="text-xs text-[#667085] mt-1">{svc.description}</p>
                  {svc.duration && (
                    <span className="inline-block text-[11px] font-medium text-[#0757D9] bg-[#E8F5FF] px-2 py-0.5 rounded-full mt-2">
                      Duration: {svc.duration}
                    </span>
                  )}
                </div>
                {svc.price && (
                  <div className="text-right shrink-0">
                    <span className="font-brand font-bold text-sm text-[#071B52]">
                      {svc.price}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* OFFERS TAB */}
        {activeTab === 'offers' && (
          <div className="flex flex-col gap-3">
            {business.offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onViewOffer={onSelectOffer}
              />
            ))}
            {business.offers.length === 0 && (
              <div className="text-center py-8 bg-white rounded-2xl border border-[#E2E8F0] p-4">
                <Tag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-[#172033]">No Active Offers</p>
                <p className="text-[11px] text-[#667085] mt-0.5">
                  Follow this business to receive notifications when new deals are announced.
                </p>
              </div>
            )}
          </div>
        )}

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex flex-col gap-3.5">
            <h3 className="font-brand font-bold text-sm text-[#172033]">
              Business Information
            </h3>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#0757D9] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#172033]">Opening Hours</p>
                <p className="text-xs text-[#667085] mt-0.5">{business.openingHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#0757D9] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#172033]">Address</p>
                <p className="text-xs text-[#667085] mt-0.5">{business.address}, {business.locality}, {business.city}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#0757D9] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#172033]">Phone</p>
                <p className="text-xs text-[#667085] mt-0.5">{business.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-[#0757D9] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#172033]">WhatsApp</p>
                <p className="text-xs text-[#667085] mt-0.5">{business.whatsapp}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-[#0757D9] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#172033]">Website</p>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#0757D9] hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{business.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-3">
            {/* Rating breakdown box */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex items-center justify-between">
              <div>
                <div className="font-brand font-extrabold text-3xl text-[#071B52]">
                  {business.rating.toFixed(1)}
                </div>
                <div className="flex items-center gap-1 text-[#0757D9] mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[11px] text-[#667085] mt-1">
                  Based on {business.reviewCount} customer ratings
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert(`Review form for ${business.name} opened. Thank you for sharing feedback!`)}
                className="px-3.5 py-2 rounded-xl bg-[#E8F5FF] text-[#0757D9] text-xs font-bold hover:bg-[#D4E8FF] transition-colors"
              >
                Write Review
              </button>
            </div>

            {/* Individual Reviews */}
            {business.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#EBF3FF] flex items-center justify-center font-bold text-xs text-[#0757D9]">
                      {rev.userAvatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#172033]">{rev.userName}</p>
                      <p className="text-[10px] text-[#667085]">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 bg-[#E8F5FF] text-[#0757D9] px-2 py-0.5 rounded text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{rev.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-[#667085] leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Bottom Enquiry Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] z-30 pb-safe">
        <button
          type="button"
          onClick={() => onEnquire(business)}
          className="w-full h-12 rounded-xl bg-tizara-gradient text-white font-brand font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0757D9]/25 active:scale-[0.98] transition-transform"
        >
          <Send className="w-4 h-4" />
          <span>Send Free Enquiry to {business.name}</span>
        </button>
      </div>
    </div>
  );
};
