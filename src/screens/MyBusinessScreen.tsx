import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  PhoneCall,
  Send,
  Bookmark,
  Edit,
  Camera,
  Tag,
  MessageSquare,
  Star,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { Business } from '../types';

interface MyBusinessScreenProps {
  business?: Business;
  onBack: () => void;
  onViewProfile: (business: Business) => void;
}

export const MyBusinessScreen: React.FC<MyBusinessScreenProps> = ({
  business,
  onBack,
  onViewProfile,
}) => {
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const displayBusiness = business || {
    id: 'b1',
    name: 'Kids Academy – After School Education',
    categoryName: 'Education',
    locality: 'Sheriff Colony, Tiruppur',
    rating: 4.8,
    reviewCount: 53,
    logo: 'KA',
  };

  const stats = [
    { label: 'Views', value: '1,240', icon: Eye, change: '+18% this week', color: '#0757D9' },
    { label: 'Calls', value: '86', icon: PhoneCall, change: '+12% this week', color: '#008CFF' },
    { label: 'Enquiries', value: '34', icon: Send, change: '4 new today', color: '#08D9F5' },
    { label: 'Favorites', value: '128', icon: Bookmark, change: '+24 total', color: '#071B52' },
  ];

  const menuItems = [
    { id: 'edit', label: 'Edit Business Details', desc: 'Update hours, contact, and category info', icon: Edit },
    { id: 'photos', label: 'Manage Photos & Gallery', desc: 'Upload storefront & product showcases', icon: Camera },
    { id: 'offers', label: 'Manage Deals & Offers', desc: 'Create discounts and promotional coupons', icon: Tag },
    { id: 'enquiries', label: 'Customer Enquiries', desc: '34 total enquiries from customers', icon: MessageSquare, badge: '4 New' },
    { id: 'reviews', label: 'Reviews & Ratings', desc: '245 verified reviews with 4.8 rating', icon: Star },
    { id: 'insights', label: 'Business Insights & Growth', desc: 'Customer demographics and search trends', icon: BarChart3 },
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setActiveNotice(`Action "${item.label}" selected. Feature ready in business dashboard.`);
    setTimeout(() => setActiveNotice(null), 3000);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div>
            <h1 className="font-brand font-extrabold text-xl text-[#172033]">
              My Business
            </h1>
            <p className="text-xs text-[#667085]">
              Merchant Partner Dashboard
            </p>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="p-4 flex flex-col gap-4 max-w-lg mx-auto">
        {/* Toast alert */}
        {activeNotice && (
          <div className="bg-[#E8F5FF] border border-[#008CFF]/30 p-3 rounded-2xl text-xs font-semibold text-[#0757D9] flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-[#0757D9] shrink-0" />
            <span>{activeNotice}</span>
          </div>
        )}

        {/* Business Profile Card */}
        <div className="bg-tizara-gradient text-white p-5 rounded-3xl shadow-lg shadow-[#071B52]/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#071B52] font-brand font-extrabold text-xl flex items-center justify-center shadow-md">
                {displayBusiness.logo || 'NE'}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-brand font-extrabold text-lg text-white">
                    {displayBusiness.name}
                  </h2>
                  <ShieldCheck className="w-4 h-4 text-[#08D9F5]" />
                </div>
                <p className="text-xs text-white/80">
                  {displayBusiness.categoryName} · {displayBusiness.locality}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/20 relative z-10">
            <div className="flex items-center gap-1.5 text-xs text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Listing is Live & Verified</span>
            </div>

            {business && (
              <button
                type="button"
                onClick={() => onViewProfile(business)}
                className="text-xs font-bold text-[#071B52] bg-white px-3 py-1.5 rounded-xl hover:bg-slate-100 active:scale-95 transition-transform"
              >
                View Public Profile
              </button>
            )}
          </div>
        </div>

        {/* Statistics Grid */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-brand font-bold text-sm text-[#172033]">
              30-Day Performance
            </h3>
            <span className="text-[11px] font-semibold text-[#0757D9]">
              Live Analytics
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.label}
                  className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#667085]">
                      {st.label}
                    </span>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: st.color }}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                  </div>

                  <div className="font-brand font-extrabold text-2xl text-[#172033] tabular-nums">
                    {st.value}
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-600 mt-1">
                    {st.change}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Management Menu */}
        <section className="bg-white rounded-3xl border border-[#E2E8F0] p-2 shadow-xs">
          <div className="px-3 py-2 text-xs font-bold text-[#667085] uppercase tracking-wider">
            Management & Tools
          </div>

          <div className="flex flex-col">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F5F8FC] active:bg-[#EBF3FF] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5FF] flex items-center justify-center text-[#0757D9]">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-[#172033]">
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-[#667085]">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] font-bold text-white bg-[#008CFF] px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
