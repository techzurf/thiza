import React, { useState } from 'react';
import {
  User,
  Building2,
  Bookmark,
  MessageSquare,
  Clock,
  Star,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  MapPin,
  Sparkles,
  Check,
  X,
  Phone,
  Mail,
} from 'lucide-react';
import { TizaraLogo } from '../components/common/TizaraLogo';
import { INITIAL_ENQUIRIES } from '../data/mockBusinesses';
import { useLanguage, Language } from '../context/LanguageContext';

interface ProfileScreenProps {
  currentLocation: string;
  onNavigateFavorites: () => void;
  onNavigateMyBusiness: () => void;
  onNavigatePricingPlans: () => void;
  onNavigateNotifications: () => void;
  onOpenLocationModal: () => void;
  onResetIntro: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentLocation,
  onNavigateFavorites,
  onNavigateMyBusiness,
  onNavigatePricingPlans,
  onNavigateNotifications,
  onOpenLocationModal,
  onResetIntro,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const menuSections = [
    {
      title: t('Activity & Management'),
      items: [
        { id: 'business', label: t('My Business Dashboard'), icon: Building2, desc: t('Manage your listing & enquiries'), action: onNavigateMyBusiness, highlight: true },
        { id: 'favorites', label: t('My Favorites'), icon: Bookmark, desc: t('Saved places & services'), action: onNavigateFavorites },
        { id: 'enquiries', label: t('My Enquiries'), icon: MessageSquare, desc: t('Recent quotes & booking requests'), action: () => setActiveModal('enquiries') },
        { id: 'recent', label: t('Recently Viewed'), icon: Clock, desc: t('Places you visited recently'), action: () => setActiveModal('recent') },
        { id: 'reviews', label: t('My Reviews'), icon: Star, desc: t('Feedback you left for businesses'), action: () => setActiveModal('reviews') },
      ],
    },
    {
      title: t('Preferences & Support'),
      items: [
        { id: 'notifications', label: t('Notifications & Alerts'), icon: Bell, desc: t('Offers, status updates & news'), action: onNavigateNotifications },
        { id: 'language', label: t('Language'), icon: Globe, desc: language === 'Tamil' ? 'தமிழ் (Tamil)' : 'English', action: () => setActiveModal('language') },
        { id: 'privacy', label: t('Privacy & Terms'), icon: Shield, desc: t('User security & platform terms'), action: () => setActiveModal('privacy') },
        { id: 'help', label: t('Help & Support'), icon: HelpCircle, desc: t('FAQs & 24/7 customer care'), action: () => setActiveModal('help') },
        { id: 'about', label: t('About Tizara'), icon: Info, desc: `Version 2.4 · ${t('Discover • Connect • Grow', 'Discover • Connect • Grow')}`, action: () => setActiveModal('about') },
      ],
    },
  ];

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Profile Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
          {t('Profile')}
        </h1>
        <p className="text-xs text-[#667085]">
          {t('Preferences & Support')}
        </p>
      </header>

      {/* Main Container */}
      <main className="p-4 flex flex-col gap-4 max-w-lg mx-auto">
        {/* User Profile Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-tizara-gradient p-1 flex items-center justify-center shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <span className="font-brand font-extrabold text-xl text-[#0757D9]">
                  G
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-brand font-extrabold text-lg text-[#172033]">
                  Guest
                </h2>
                <span className="bg-[#EBF3FF] text-[#0757D9] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Guest
                </span>
              </div>
              <p className="text-xs text-[#667085]">guest@tizara.app</p>

              <button
                type="button"
                onClick={onOpenLocationModal}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#008CFF] mt-1 hover:underline"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentLocation}</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('editProfile')}
            className="text-xs font-bold text-[#0757D9] bg-[#E8F5FF] px-3 py-1.5 rounded-xl hover:bg-[#D4E8FF] transition-colors"
          >
            Edit
          </button>
        </div>

        {/* Business Owner Quick Banner */}
        <div
          role="button"
          tabIndex={0}
          onClick={onNavigatePricingPlans}
          onKeyDown={(e) => e.key === 'Enter' && onNavigatePricingPlans()}
          className="bg-tizara-gradient text-white p-4 rounded-3xl shadow-md cursor-pointer flex items-center justify-between active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Merchant & Business Hub
              </h3>
              <p className="text-xs text-white/80">
                Choose your business plan & reach local customers
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>

        {/* Menu Sections */}
        {menuSections.map((sec) => (
          <section
            key={sec.title}
            className="bg-white rounded-3xl border border-[#E2E8F0] p-2 shadow-xs"
          >
            <div className="px-3 py-2 text-xs font-bold text-[#667085] uppercase tracking-wider">
              {sec.title}
            </div>

            <div className="flex flex-col">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.action}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left transition-colors ${
                      item.highlight
                        ? 'bg-[#F0F6FF] hover:bg-[#E6FAFD]'
                        : 'hover:bg-[#F5F8FC]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          item.highlight
                            ? 'bg-[#0757D9] text-white'
                            : 'bg-[#E8F5FF] text-[#0757D9]'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-[#172033] truncate">
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-[#667085] truncate">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {/* Logout / Reset Intro */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={onResetIntro}
            className="w-full py-3 rounded-2xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#0757D9] hover:bg-slate-50 transition-colors"
          >
            Show Splash & Onboarding Tour Again
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to log out of Tizara?')) {
                onResetIntro();
              }
            }}
            className="w-full py-3 rounded-2xl bg-white border border-rose-200 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('Logout')}</span>
          </button>
        </div>

        {/* App Version Footer */}
        <div className="text-center py-4">
          <TizaraLogo variant="horizontal" size="sm" showTagline className="justify-center" />
          <p className="text-[10px] text-[#667085] mt-2">
            Tizara Business Discovery Mobile v2.4.0
          </p>
        </div>
      </main>

      {/* Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200 pb-safe"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#172033]">
                {activeModal === 'about' && t('About Tizara')}
                {activeModal === 'help' && t('Help & Support')}
                {activeModal === 'privacy' && t('Privacy & Terms')}
                {activeModal === 'language' && t('Select Language')}
                {activeModal === 'enquiries' && t('My Enquiries')}
                {activeModal === 'recent' && t('Recently Viewed Places')}
                {activeModal === 'reviews' && t('My Reviews')}
                {activeModal === 'editProfile' && t('Edit Profile')}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs text-[#667085] leading-relaxed">
              {activeModal === 'about' && (
                <div className="flex flex-col gap-3">
                  <TizaraLogo variant="full" size="md" showTagline />
                  <p>
                    Tizara is a next-generation business discovery and networking platform designed for modern mobile users. Our mission is to connect communities with verified local businesses, authentic customer reviews, and exclusive digital promotions.
                  </p>
                  <p className="font-semibold text-[#0757D9]">
                    Discover • Connect • Grow
                  </p>
                </div>
              )}

              {activeModal === 'language' && (
                <div className="flex flex-col gap-2">
                  {(['English', 'Tamil'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLanguage(lang);
                        setActiveModal(null);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F5F8FC] hover:bg-[#EBF3FF] text-[#172033] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <span className="font-bold">{lang === 'Tamil' ? 'தமிழ் (Tamil)' : 'English'}</span>
                      {language === lang && <Check className="w-4 h-4 text-[#0757D9]" />}
                    </button>
                  ))}
                </div>
              )}

              {activeModal === 'help' && (
                <div className="flex flex-col gap-3.5">
                  {/* Tiruppur Office Card */}
                  <div className="p-3.5 bg-[#F5F8FC] rounded-2xl border border-slate-200 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[#0757D9]">
                      <MapPin className="w-4 h-4 shrink-0 stroke-[2.2]" />
                      <span className="font-bold text-xs uppercase tracking-wider text-[#071B52]">
                        {t('Tiruppur Office')}
                      </span>
                    </div>

                    <div className="text-xs text-[#172033] font-bold">
                      AsinMart Private Limited
                    </div>

                    <div className="text-[11px] text-[#475467] leading-relaxed font-normal">
                      <p>SF NO-186/2, N.M ROAD, NO 35/1, RVE NAGAR,</p>
                      <p>4TH STREET, (NORTH), RAKKIYAPALAYAM PRIVU,</p>
                      <p>KANGEYAM MAIN ROAD,</p>
                      <p className="font-semibold text-[#172033]">TIRUPPUR - 641604</p>
                    </div>
                  </div>

                  {/* Phone & Email Contact Cards */}
                  <div className="flex flex-col gap-2">
                    {/* Phone */}
                    <a
                      href="tel:9443425951"
                      className="p-3 bg-[#F5F8FC] hover:bg-[#EBF3FF] rounded-2xl border border-slate-200 flex items-center gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0757D9] shadow-2xs group-hover:bg-[#0757D9] group-hover:text-white transition-colors shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider">
                          {t('Phone')}
                        </span>
                        <span className="text-xs font-bold text-[#172033] group-hover:text-[#0757D9] transition-colors">
                          9443425951
                        </span>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:support@asinmart.com"
                      className="p-3 bg-[#F5F8FC] hover:bg-[#EBF3FF] rounded-2xl border border-slate-200 flex items-center gap-3 transition-colors group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0757D9] shadow-2xs group-hover:bg-[#0757D9] group-hover:text-white transition-colors shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider">
                          {t('Email')}
                        </span>
                        <span className="text-xs font-bold text-[#172033] truncate group-hover:text-[#0757D9] transition-colors">
                          support@asinmart.com
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {activeModal === 'enquiries' && (
                <div className="flex flex-col gap-2.5">
                  {INITIAL_ENQUIRIES.map((enq) => (
                    <div key={enq.id} className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#172033]">{enq.businessName}</p>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#667085] mt-1">{enq.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{enq.categoryName} · {enq.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'recent' && (
                <div className="flex flex-col gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F5F8FC] border border-slate-200">
                    <p className="font-bold text-[#172033]">1. Kids Academy – After School Education</p>
                    <p className="text-[11px] text-[#667085]">Education · Sheriff Colony, Tiruppur</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F5F8FC] border border-slate-200">
                    <p className="font-bold text-[#172033]">2. Fashion Designing Institute – Tiruppur</p>
                    <p className="text-[11px] text-[#667085]">Education · Avinashi Road, Tiruppur</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F5F8FC] border border-slate-200">
                    <p className="font-bold text-[#172033]">3. Golden Ayurvedic Centre</p>
                    <p className="text-[11px] text-[#667085]">Doctors & Clinics · PN Road, Tiruppur</p>
                  </div>
                </div>
              )}

              {activeModal === 'reviews' && (
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-[#F5F8FC] rounded-xl border border-slate-200">
                    <p className="font-bold text-[#172033]">Fashion Designing Institute – Tiruppur</p>
                    <p className="text-[11px] text-[#0757D9]">★ 5.0 Rating · &quot;Outstanding CAD pattern making and practical training!&quot;</p>
                  </div>
                </div>
              )}

              {activeModal === 'privacy' && (
                <div className="flex flex-col gap-2">
                  <p>Your data is encrypted end-to-end. We do not sell user contact details to unsolicited third parties. Enquiries are sent solely to businesses you select.</p>
                </div>
              )}

              {activeModal === 'editProfile' && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block font-bold text-[#172033] mb-1">{t('Full Name')}</label>
                    <input defaultValue="Guest" className="w-full p-2.5 rounded-xl bg-[#F5F8FC] border border-slate-200 text-xs font-semibold" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#172033] mb-1">{t('Email')}</label>
                    <input defaultValue="guest@tizara.app" className="w-full p-2.5 rounded-xl bg-[#F5F8FC] border border-slate-200 text-xs font-semibold" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 rounded-xl bg-[#0757D9] text-white font-bold text-xs mt-2 cursor-pointer"
                  >
                    {t('Save Changes')}
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-xl bg-slate-100 font-bold text-xs text-[#172033] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {t('Close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
