import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Zap,
  Crown,
  Shield,
  Star,
  CheckCircle2,
  TrendingUp,
  Building2,
  PhoneCall,
  X,
} from 'lucide-react';
import { TizaraLogo } from '../components/common/TizaraLogo';
import { useLanguage } from '../context/LanguageContext';

interface BusinessPlansScreenProps {
  onBack: () => void;
  onSelectPlan?: (planId: string) => void;
}

interface PlanItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  badge?: string;
  highlight?: boolean;
  accentColor: string;
  badgeColor?: string;
  icon: React.ElementType;
  features: string[];
  ctaText: string;
}

const PLANS: PlanItem[] = [
  {
    id: 'free',
    name: 'Free Plan',
    subtitle: 'Essential presence for new businesses',
    price: '₹0',
    period: 'forever',
    accentColor: '#64748B',
    icon: Building2,
    features: [
      'Basic business listing',
      'Business name & category',
      'Location & contact details',
      'Basic visibility',
    ],
    ctaText: 'Choose Plan',
  },
  {
    id: 'starter',
    name: 'Starter Plan',
    subtitle: 'Direct customer engagement & leads',
    price: '₹499',
    period: '/month',
    accentColor: '#008CFF',
    icon: Zap,
    features: [
      'Enhanced business listing',
      'Business photos',
      'WhatsApp & call buttons',
      'Customer enquiries',
      'Better visibility',
    ],
    ctaText: 'Choose Plan',
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    subtitle: 'Boosted search ranking & deal promotions',
    price: '₹999',
    period: '/month',
    badge: 'RECOMMENDED',
    accentColor: '#0757D9',
    badgeColor: 'bg-[#0757D9] text-white',
    icon: TrendingUp,
    features: [
      'Everything in Starter',
      'Featured listing',
      'Offers & coupons',
      'Priority visibility',
      'Business analytics',
    ],
    ctaText: 'Choose Plan',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    subtitle: 'Maximum local dominance & VIP support',
    price: '₹1,999',
    period: '/month',
    badge: 'BEST VALUE',
    highlight: true,
    accentColor: '#0757D9',
    badgeColor: 'bg-gradient-to-r from-[#0757D9] to-[#08D9F5] text-white shadow-sm',
    icon: Crown,
    features: [
      'Everything in Growth',
      'Top placement',
      'Premium featured badge',
      'Advanced analytics',
      'Promotional visibility',
      'Priority support',
    ],
    ctaText: 'Choose Plan',
  },
];

export const BusinessPlansScreen: React.FC<BusinessPlansScreenProps> = ({
  onBack,
  onSelectPlan,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const handlePlanClick = (plan: PlanItem) => {
    setSelectedPlanId(plan.id);
    setShowConfirmation(plan.name);
    if (onSelectPlan) {
      onSelectPlan(plan.id);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-12">
      {/* Sticky App Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-2xl bg-[#F5F8FC] border border-[#E2E8F0] text-[#172033] hover:bg-[#EBF3FF] active:scale-95 transition-all cursor-pointer"
              aria-label={t('Back')}
            >
              <ArrowLeft className="w-5 h-5 text-[#0757D9]" />
            </button>
            <div>
              <h1 className="font-brand font-extrabold text-lg text-[#172033] tracking-tight">
                {t('Business Listing Plans')}
              </h1>
              <p className="text-[11px] font-medium text-[#64748B]">
                {t('Merchant & Business Hub')}
              </p>
            </div>
          </div>

          <TizaraLogo variant="mark" size="sm" />
        </div>
      </header>

      {/* Screen Hero Intro */}
      <main className="p-4 max-w-lg mx-auto flex flex-col gap-5">
        <div className="text-center pt-2 pb-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] text-[#0757D9] text-[11px] font-extrabold uppercase tracking-wider mb-2.5 shadow-2xs border border-[#0757D9]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
            <span>Tizara Merchant Hub</span>
          </div>
          <h2 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight sm:text-3xl leading-snug">
            {t('Choose Your Business Plan')}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-xs mx-auto leading-relaxed">
            {t('List your business on Tizara and reach more local customers.')}
          </p>
        </div>

        {/* 4 Pricing Cards Stack */}
        <div className="flex flex-col gap-4">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const isHighlight = plan.highlight;
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl transition-all duration-200 overflow-hidden ${
                  isHighlight
                    ? 'bg-white border-2 border-[#0757D9] shadow-[0_8px_30px_rgba(7,87,217,0.12)] ring-4 ring-[#0757D9]/10'
                    : 'bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Badge for Recommended / Best Value */}
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <span
                      className={`inline-block text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-2xl ${
                        plan.badgeColor || 'bg-[#0757D9] text-white'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  {/* Header Row */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xs shrink-0 ${
                        isHighlight
                          ? 'bg-tizara-gradient text-white'
                          : 'bg-[#F1F5F9] text-[#0757D9]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <div className="pr-16">
                      <h3 className="font-brand font-extrabold text-lg text-[#172033]">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="my-3.5 py-2.5 px-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0]/70 flex items-baseline gap-1.5">
                    <span className="font-brand font-black text-2xl text-[#172033] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#64748B] font-medium">
                      {plan.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 my-4">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isHighlight
                              ? 'bg-[#08D9F5]/20 text-[#0757D9]'
                              : 'bg-[#EBF3FF] text-[#0757D9]'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-xs text-[#334155] font-semibold leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer ${
                      isHighlight
                        ? 'bg-tizara-gradient text-white shadow-md hover:shadow-lg shadow-[#0757D9]/20'
                        : isSelected
                        ? 'bg-[#0757D9] text-white shadow-sm'
                        : 'bg-[#EBF3FF] text-[#0757D9] hover:bg-[#D8EAFF]'
                    }`}
                  >
                    <span>{t(plan.ctaText)}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Support Footer Card */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-4 text-center shadow-2xs mt-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0757D9] mb-1">
            <Shield className="w-4 h-4 text-[#008CFF]" />
            <span>Zero Lock-In · Cancel Anytime</span>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Need custom enterprise onboarding or agency support? Contact our merchant desk at <span className="font-semibold text-[#172033]">merchant@tizara.app</span>.
          </p>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FF] text-[#0757D9] flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="font-brand font-bold text-lg text-center text-[#172033]">
              Plan Selected: {showConfirmation}
            </h3>
            <p className="text-xs text-center text-[#64748B] mt-1.5 leading-relaxed">
              Your merchant listing request has been recorded for demo presentation. A Tizara specialist will verify your store details.
            </p>

            <button
              type="button"
              onClick={() => setShowConfirmation(null)}
              className="w-full mt-5 py-3 rounded-xl bg-[#0757D9] text-white font-bold text-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              {t('Close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
