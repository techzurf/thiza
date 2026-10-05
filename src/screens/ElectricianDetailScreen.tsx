import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  X,
  Share2,
  Check,
  Wrench,
  Lightbulb,
  Fan,
  Power,
  ShieldAlert,
  Home,
  Building2,
  Cable,
} from 'lucide-react';

interface ElectricianDetailScreenProps {
  onBack: () => void;
  onEnquire?: () => void;
}

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
];

const ELECTRICAL_SERVICES = [
  {
    id: 'electrical-repair',
    title: 'Electrical Repair & Troubleshooting',
    popular: true,
    points: [
      'Diagnosis and repair of sudden power outages & tripped MCBs',
      'Neutral failure, phase imbalance, and voltage fluctuation fixes',
      'Short circuit investigation and burnt wire replacements',
      'Prompt emergency doorstep electrician visits in Tiruppur',
    ],
  },
  {
    id: 'wiring-rewiring',
    title: 'Wiring & Rewiring',
    popular: false,
    points: [
      'Complete home conduit wiring for new constructions & renovations',
      'Heavy-gauge copper cable laying for ACs, geysers & machinery',
      'Main distribution board (DB) dressing, earthing & inverter wiring',
      'Commercial wiring for retail shops, godowns, and offices',
    ],
  },
  {
    id: 'switch-socket',
    title: 'Switch & Socket Repair / Replacement',
    popular: false,
    points: [
      'Modular switchboard installation, re-fixing and replacement',
      'Heavy 16A/25A power socket installation for heavy appliances',
      'Fixing loose contacts, sparking switches, and burnt socket plugs',
      'Installation of child-safe socket shutters & USB charging ports',
    ],
  },
  {
    id: 'fan-service',
    title: 'Fan Installation / Repair',
    popular: false,
    points: [
      'Ceiling fan, exhaust fan & wall fan mounting with safety pins',
      'Regulator replacement, capacitor change, and bearing noise fixes',
      'BLDC energy-efficient ceiling fan fitting & remote syncing',
      'High-ceiling fan rod extension & balancing',
    ],
  },
  {
    id: 'light-installation',
    title: 'Light Installation & Fixtures',
    popular: false,
    points: [
      'LED batten, tube light, false ceiling spot light & cob light fitting',
      'Chandelier and decorative pendant light assembly and mounting',
      'Outdoor flood light, gate lamp, and sensor-activated lights',
      'Profile LED strip lighting for modular kitchens and living rooms',
    ],
  },
  {
    id: 'fault-repair',
    title: 'Electrical Fault Repair',
    popular: false,
    points: [
      'Detailed circuit testing with multimeters & insulation testers',
      'Earth leakage circuit breaker (ELCB / RCCB) testing and repair',
      'Tracing concealed broken conduits and loose junction box wires',
      'Correction of reversed polarity and dangerous open wire connections',
    ],
  },
  {
    id: 'appliance-work',
    title: 'Appliance Electrical Work',
    popular: false,
    points: [
      'Geyser / water heater power point setup and heating element check',
      'Inverter & battery rack connection with bypass changeover switch',
      'Submersible motor pump starter & control panel wiring',
      'Kitchen chimney, microwave & washing machine electrical connection',
    ],
  },
];

const SERVICES_AVAILABLE_GRID = [
  {
    icon: Wrench,
    title: 'General Electrical Repair',
    desc: 'Fault fixes, tripping MCB & short circuit correction',
  },
  {
    icon: Cable,
    title: 'Wiring & Rewiring',
    desc: 'Complete concealed piping & renovation electrical cables',
  },
  {
    icon: Power,
    title: 'Switch & Socket Work',
    desc: 'Modular switches, 16A power points & board replacement',
  },
  {
    icon: Fan,
    title: 'Fan Mounting & Repair',
    desc: 'Ceiling, exhaust & BLDC fan fitting with regulator fixes',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Installation',
    desc: 'LED battens, profile lights, chandeliers & spotlights',
  },
  {
    icon: ShieldAlert,
    title: 'Electrical Fault Repair',
    desc: 'ELCB testing, earthing check & safety wire dressing',
  },
  {
    icon: Zap,
    title: 'Appliance Electricals',
    desc: 'Inverter setup, geyser wiring & motor starter boxes',
  },
  {
    icon: Home,
    title: 'Plumbing & Electrical Works',
    desc: 'Comprehensive electrical and plumbing utility services',
  },
];

const SERVICE_AREAS = [
  'Tiruppur (City-wide)',
  'PN Road',
  'Avinashi Road',
  'Dharapuram Road',
  'Kangeyam Road',
  'Palladam Road',
  'Tiruppur Bazaar',
  'Rayapuram',
  'Gandhi Nagar',
  'College Road',
  'Anupparpalayam',
  'Veerapandi & Industrial Zones',
];

export const ElectricianDetailScreen: React.FC<ElectricianDetailScreenProps> = ({
  onBack,
  onEnquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Electrical Repair & Troubleshooting');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [copiedShare, setCopiedShare] = useState(false);

  // Form State for modal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Tiruppur');
  const [preferredDate, setPreferredDate] = useState('Today (Immediate Service)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenEnquiry = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'AK Electricals - Electrician Services in Tiruppur',
          text: 'Book certified electrician services in Tiruppur for wiring, switch repairs, fans, lighting, and electrical fault fixing.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] text-[#172033] relative flex flex-col pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-brand font-extrabold text-sm tracking-wider uppercase text-[#172033]">
            ELECTRICIAN
          </span>
          <span className="text-[10px] font-semibold text-[#0757D9]">
            AK Electricals · Tiruppur
          </span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Share"
          className="w-10 h-10 -mr-1 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all relative"
        >
          <Share2 className="w-4 h-4 text-[#475467]" />
          {copiedShare && (
            <span className="absolute -bottom-6 right-0 text-[10px] font-bold bg-[#172033] text-white px-2 py-0.5 rounded shadow">
              Copied!
            </span>
          )}
        </button>
      </header>

      {/* Main Content Body */}
      <main className="flex flex-col gap-5 px-4 pt-4">
        {/* Large Electrician / Electrical Service Image */}
        <section className="flex flex-col gap-2.5">
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-900 shadow-[0_4px_20px_rgba(7,27,82,0.08)] border border-[#E2E8F0]">
            <img
              src={GALLERY_IMAGES[activeImageIndex]}
              alt="AK Electricals - Electrician Services in Tiruppur"
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Gradient shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating badges on image */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
              <span className="inline-flex items-center gap-1 bg-[#0757D9]/90 backdrop-blur-md text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D0F5]" />
                <span>Verified Partner</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Same-Day Electrical Work</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
              <span className="text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                All Types of Electrical & Plumbing Works
              </span>
              <span className="text-[11px] font-bold bg-white/25 px-2 py-0.5 rounded-md backdrop-blur-xs">
                {activeImageIndex + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </div>

          {/* Mini Gallery Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all active:scale-95 ${
                  activeImageIndex === idx
                    ? 'border-[#0757D9] shadow-sm scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Electrical Service Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Business Title, Location & Quick Info */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Doorstep Electrical Solutions</span>
            </div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              AK Electricals
            </h1>
            <p className="text-xs font-semibold text-[#0757D9] mt-0.5">
              Electrician Services
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-[#667085] mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0757D9] shrink-0" />
              <span>Tiruppur, Tamil Nadu</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">Available for Booking</span>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            AK Electricals provides reliable residential and commercial electrician
            services across Tiruppur. Specializing in all types of electrical repairs,
            concealed wiring, switchboard fittings, fan & light mounting, and emergency
            fault rectifications.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-[#667085]">
              <Clock className="w-3.5 h-3.5 text-[#0757D9]" />
              <span>Flexible Doorstep Visits</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0757D9] bg-[#F5F8FC] border border-[#E2E8F0] px-2.5 py-1 rounded-full">
                <Home className="w-3 h-3" />
                <span>Homes</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#071B52] bg-[#F5F8FC] border border-[#E2E8F0] px-2.5 py-1 rounded-full">
                <Building2 className="w-3 h-3" />
                <span>Commercial</span>
              </span>
            </div>
          </div>

          {/* Primary Top Action Button */}
          <button
            type="button"
            onClick={() => handleOpenEnquiry('Electrical Repair & Troubleshooting')}
            className="w-full mt-2 bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] hover:opacity-95 text-white font-brand font-bold text-sm tracking-wide py-3.5 rounded-2xl shadow-md shadow-[#0757D9]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            <span>Send Free Enquiry</span>
          </button>
        </section>

        {/* SECTION: ELECTRICAL SERVICES */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Electrical Services
              </h2>
              <p className="text-xs text-[#667085]">
                Specialized electrical works by AK Electricals
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0757D9] bg-[#E8F5FF] px-2 py-0.5 rounded-md">
              {ELECTRICAL_SERVICES.length} Services
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {ELECTRICAL_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className={`bg-white rounded-2xl p-4 border transition-all ${
                  srv.popular
                    ? 'border-[#008CFF] shadow-[0_4px_16px_rgba(0,140,255,0.08)] relative overflow-hidden'
                    : 'border-[#E2E8F0] shadow-xs'
                }`}
              >
                {srv.popular && (
                  <div className="absolute top-0 right-0 bg-[#0757D9] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-bl-xl shadow-xs uppercase tracking-wider">
                    Popular
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[#172033]">
                      {srv.title}
                    </h3>
                    <span className="text-[11px] text-[#0757D9] font-medium block mt-0.5">
                      Doorstep Service · Tiruppur
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenEnquiry(srv.title)}
                    className="shrink-0 bg-[#F5F8FC] hover:bg-[#E8F5FF] text-[#0757D9] border border-[#0757D9]/30 text-xs font-bold px-3 py-1.5 rounded-xl active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Select</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <ul className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                  {srv.points.map((pt, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#475467] flex items-start gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: ABOUT THE SERVICE */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                About The Service
              </h2>
              <p className="text-xs text-[#667085]">
                AK Electricals in Tiruppur
              </p>
            </div>
          </div>

          <div className="text-xs leading-relaxed text-[#475467] flex flex-col gap-2.5">
            <p>
              AK Electricals is an established electrician and electrical service provider
              operating across Tiruppur, catering to residential apartments, independent
              houses, textile manufacturing units, shops, and commercial offices.
            </p>
            <p>
              Equipped to handle all types of electrical and associated utility works,
              services range from precision fault diagnosis, circuit breaker and fuse
              replacements to complete new building wiring, ceiling fan fittings, modular
              switchboard installations, inverter wiring, and appliance electrical
              connections with safety and durability in mind.
            </p>
          </div>

          {/* Quick Highlights */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
              <span className="font-bold text-xs text-[#0757D9] block">
                Safety First
              </span>
              <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
                Proper insulation, earthing verification, and safe circuit connections.
              </p>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
              <span className="font-bold text-xs text-[#071B52] block">
                Comprehensive Utility
              </span>
              <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
                All types of residential and commercial electrical and plumbing works.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: SERVICES AVAILABLE (2-Column Grid with small modern icons) */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Services Available
            </h2>
            <p className="text-xs text-[#667085]">
              Quick overview of electrical solutions offered
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {SERVICES_AVAILABLE_GRID.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-3.5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between gap-2"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#172033] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#667085] mt-0.5 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenEnquiry(item.title)}
                    className="text-[11px] font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 self-start pt-1"
                  >
                    <span>Enquire</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: SERVICE AREA */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0757D9] shrink-0" />
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                Service Area
              </h2>
              <p className="text-xs text-[#667085]">
                Tiruppur and surrounding locations
              </p>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            AK Electricals provides prompt on-site visits across all major residential,
            commercial, and industrial areas throughout Tiruppur:
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {SERVICE_AREAS.map((area, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold text-[#172033] bg-[#F5F8FC] border border-[#E2E8F0] px-2.5 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION: CONTACT / ENQUIRY - Bottom Prominent CTA */}
        <section className="pt-2">
          <button
            type="button"
            onClick={() => handleOpenEnquiry()}
            className="w-full bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] hover:opacity-95 text-white font-brand font-bold text-base tracking-wide py-4 rounded-2xl shadow-lg shadow-[#0757D9]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer min-h-[52px]"
          >
            <Send className="w-5 h-5" />
            <span>Send Free Enquiry</span>
          </button>
          <p className="text-center text-[11px] text-[#667085] mt-2 font-medium">
            ⚡ Quick response · Direct technician consultation in Tiruppur
          </p>
        </section>
      </main>

      {/* Interactive Free Enquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90dvh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0757D9]">
                  Tizara FastConnect
                </span>
                <h3 className="font-brand font-bold text-lg text-[#172033]">
                  Send Free Enquiry
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto">
              {isSuccess ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-brand font-extrabold text-xl text-[#172033]">
                    Enquiry Submitted!
                  </h4>
                  <p className="text-xs text-[#667085] mt-2 max-w-xs leading-relaxed">
                    Thank you! An authorized technician from{' '}
                    <strong className="text-[#172033]">AK Electricals</strong> will contact you
                    shortly to discuss your electrical work and schedule a visit in{' '}
                    <strong className="text-[#172033]">{address}</strong>.
                  </p>
                  <div className="mt-4 p-3 bg-[#F5F8FC] rounded-2xl w-full text-left text-xs text-[#475467] border border-[#E2E8F0]">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Work:</span>
                      <span className="font-bold text-[#172033]">{selectedService}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Property:</span>
                      <span className="font-bold text-[#172033] capitalize">{propertyType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Location:</span>
                      <span className="font-bold text-[#172033]">{address}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#667085]">Contact:</span>
                      <span className="font-bold text-[#172033]">{phone || '+91 98401 98765'}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSuccess(false);
                    }}
                    className="mt-6 w-full bg-[#0757D9] text-white font-bold text-sm py-3 rounded-xl shadow active:scale-98 transition-transform"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="flex flex-col gap-4">
                  {/* Property Type Toggle */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPropertyType('residential')}
                        className={`text-xs font-bold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          propertyType === 'residential'
                            ? 'bg-[#E8F5FF] text-[#0757D9] border-[#0757D9]'
                            : 'bg-[#F5F8FC] text-[#475467] border-[#E2E8F0]'
                        }`}
                      >
                        <Home className="w-3.5 h-3.5" />
                        <span>Residential</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType('commercial')}
                        className={`text-xs font-bold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          propertyType === 'commercial'
                            ? 'bg-[#E8F5FF] text-[#0757D9] border-[#0757D9]'
                            : 'bg-[#F5F8FC] text-[#475467] border-[#E2E8F0]'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Commercial</span>
                      </button>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Select Electrical Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    >
                      {ELECTRICAL_SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manikandan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl pl-11 pr-3 py-2.5 text-xs text-[#172033] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                      />
                    </div>
                  </div>

                  {/* Service Location in Tiruppur */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Location / Area in Tiruppur
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. PN Road / Kangeyam Road, Tiruppur"
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    />
                  </div>

                  {/* Preferred Slot */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Today (Immediate Service)',
                        'Tomorrow Morning',
                        'Tomorrow Afternoon',
                        'This Weekend',
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredDate(slot)}
                          className={`text-[11px] font-semibold py-2 px-2.5 rounded-xl border text-center transition-all ${
                            preferredDate === slot
                              ? 'bg-[#E8F5FF] text-[#0757D9] border-[#0757D9]'
                              : 'bg-[#F5F8FC] text-[#475467] border-[#E2E8F0]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] text-white font-brand font-bold text-sm py-3.5 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Free Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
