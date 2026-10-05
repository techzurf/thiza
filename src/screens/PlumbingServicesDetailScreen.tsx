import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  X,
  Share2,
  Check,
  Droplets,
  Pipette,
  Bath,
  UtensilsCrossed,
  Layers,
  Home,
  Building2,
  AlertTriangle,
} from 'lucide-react';

interface PlumbingServicesDetailScreenProps {
  onBack: () => void;
  onEnquire?: () => void;
}

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1000&q=80',
];

const PLUMBING_SERVICES = [
  {
    id: 'plumbing-repairs',
    title: 'Plumbing Repairs',
    popular: true,
    points: [
      'Emergency troubleshooting of low water pressure and valve failures',
      'Fixing noisy pipes, water hammer vibration, and air-lock issues',
      'Overhead tank float valve and ball cock replacement',
      'Rapid doorstep emergency plumber visit in Perumanallur & Tiruppur',
    ],
  },
  {
    id: 'pipe-repair',
    title: 'Pipe Repair & Replacement',
    popular: false,
    points: [
      'Repairs for damaged CPVC, UPVC, PVC, and GI plumbing pipes',
      'Concealed wall pipeline repairs and replacement of rusted elbows',
      'New pipeline layout for bathroom, kitchen, and wash areas',
      'Main water line trenching and durable joint solvent welding',
    ],
  },
  {
    id: 'leakage-repair',
    title: 'Water Leakage Repair',
    popular: false,
    points: [
      'Concealed pipeline leak detection behind bathroom tiles & walls',
      'Slab dampness, ceiling seepage, and drip line rectification',
      'Waterproofing seals around shower drains, traps, and pipe collars',
      'Pressure testing of plumbing lines to ensure zero recurring leaks',
    ],
  },
  {
    id: 'tap-faucet-repair',
    title: 'Tap / Faucet Repair',
    popular: false,
    points: [
      'Fixing dripping taps, worn-out spindle washers, and loose levers',
      'Installation of modern quarter-turn faucets and pillar taps',
      'Wall mixer, diverter valve & hand shower cartridge servicing',
      'Descaling aerators to restore smooth, consistent water flow',
    ],
  },
  {
    id: 'bathroom-plumbing',
    title: 'Bathroom Plumbing',
    popular: false,
    points: [
      'Western closet (commode), EWC, and Indian toilet pan installation',
      'Dual-flush tank mechanism repairs, cistern push-button changes',
      'Washbasin mounting, bottle trap fitting & pedestal installation',
      'Overhead shower, health faucet (jet spray) and geyser inlet fitting',
    ],
  },
  {
    id: 'kitchen-plumbing',
    title: 'Kitchen Plumbing',
    popular: false,
    points: [
      'Stainless steel and granite kitchen sink plumbing & drain traps',
      'RO water purifier and dishwasher inlet/outlet plumbing lines',
      'Flexible waste pipe connection and odor-proof trap installation',
      'Fixing sink basin drainage leaks and counter-top tap wobbling',
    ],
  },
  {
    id: 'drainage-services',
    title: 'Drainage Services',
    popular: false,
    points: [
      'Clearing choked bathroom floor traps, nahani traps, and waste lines',
      'Drain declogging using heavy-duty manual and mechanical augers',
      'External sewer chamber desilting and gully trap maintenance',
      'Elimination of foul drainage odors and backflow prevention',
    ],
  },
  {
    id: 'installation-services',
    title: 'Installation Services',
    popular: false,
    points: [
      'Overhead Loft & Sintex water tank connection with overflow pipes',
      'Domestic pressure booster pump & submersible motor connection',
      'Complete sanitaryware fitting for newly constructed residences',
      'Commercial plumbing setup for offices, shops, and workshops',
    ],
  },
];

const SERVICES_AVAILABLE_GRID = [
  {
    icon: Wrench,
    title: 'Plumbing Repairs',
    desc: 'General maintenance, valves & pressure fixes',
  },
  {
    icon: Pipette,
    title: 'Pipe Repair',
    desc: 'CPVC, UPVC, PVC & GI pipeline replacement',
  },
  {
    icon: Droplets,
    title: 'Water Leakage Repair',
    desc: 'Concealed leak detection & seepage repair',
  },
  {
    icon: Sparkles,
    title: 'Tap / Faucet Repair',
    desc: 'Mixers, spindle washers & quarter-turn taps',
  },
  {
    icon: Bath,
    title: 'Bathroom Plumbing',
    desc: 'Sanitaryware, closets, flushes & showers',
  },
  {
    icon: UtensilsCrossed,
    title: 'Kitchen Plumbing',
    desc: 'Sink drains, traps, RO water & appliances',
  },
  {
    icon: AlertTriangle,
    title: 'Drainage Services',
    desc: 'Choked trap clearing & sewer desilting',
  },
  {
    icon: Layers,
    title: 'Installation Services',
    desc: 'Water tanks, booster pumps & sanitaryware',
  },
];

const SERVICE_AREAS = [
  'Nambiyur Road (Primary Location)',
  'Perumanallur (Permanallur)',
  'Tiruppur City',
  'Avinashi Road',
  'PN Road Corridor',
  'Pooluvapatti',
  'Pandian Nagar',
  'Neruperichal',
  'Anupparpalayam',
  'Kunnathur Road',
  'Veerapandi & Industrial Zones',
];

export const PlumbingServicesDetailScreen: React.FC<PlumbingServicesDetailScreenProps> = ({
  onBack,
  onEnquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Plumbing Repairs');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [copiedShare, setCopiedShare] = useState(false);

  // Form State for modal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Perumanallur, Tiruppur');
  const [preferredDate, setPreferredDate] = useState('Immediate Emergency Visit');
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
          title: 'Sree Nidhi Multi Service - Plumbing Services in Tiruppur',
          text: 'Book professional plumbing repair, pipe fixing, and leak rectification on Nambiyur Road, Perumanallur, Tiruppur.',
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

        <div className="flex flex-col items-center max-w-[210px] text-center">
          <span className="font-brand font-extrabold text-sm tracking-wider uppercase text-[#172033] truncate">
            PLUMBING SERVICES
          </span>
          <span className="text-[10px] font-semibold text-[#0757D9] truncate">
            Sree Nidhi Multi Service
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
        {/* Large Plumbing Service Image & Mini Gallery */}
        <section className="flex flex-col gap-2.5">
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-900 shadow-[0_4px_20px_rgba(7,27,82,0.08)] border border-[#E2E8F0]">
            <img
              src={GALLERY_IMAGES[activeImageIndex]}
              alt="Sree Nidhi Multi Service - Plumbing Services in Tiruppur"
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Gradient shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating badges on image */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
              <span className="inline-flex items-center gap-1 bg-[#0757D9]/90 backdrop-blur-md text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D0F5]" />
                <span>Verified Plumber</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open 24 Hours · Rapid Dispatch</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
              <span className="text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                Pipe Repair, Leak Fixing & Sanitaryware
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
                  alt={`Plumbing Service Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Business Title, Category, Location & Quick Info */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Doorstep Plumbing Solutions</span>
            </div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              Sree Nidhi Multi Service
            </h1>
            <p className="text-xs font-semibold text-[#0757D9] mt-0.5">
              Professional Plumbing Services
            </p>
            <div className="flex items-center gap-1 text-xs font-medium text-[#667085] mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0757D9] shrink-0" />
              <span>Nambiyur Road, Perumanallur, Tiruppur</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open 24 Hours</span>
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

          <p className="text-xs text-[#475467] leading-relaxed">
            Professional plumbing services across Perumanallur and Tiruppur. Sree Nidhi
            Multi Service handles emergency pipe burst fixes, concealed water leakage
            rectification, tap replacements, sanitaryware installations, and drainage
            unclogging.
          </p>

          {/* Primary Top Action Button */}
          <button
            type="button"
            onClick={() => handleOpenEnquiry('Plumbing Repairs')}
            className="w-full mt-2 bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] hover:opacity-95 text-white font-brand font-bold text-sm tracking-wide py-3.5 rounded-2xl shadow-md shadow-[#0757D9]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            <span>Send Free Enquiry</span>
          </button>
        </section>

        {/* SECTION: PLUMBING SERVICES */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Plumbing Services
              </h2>
              <p className="text-xs text-[#667085]">
                Specialized solutions by Sree Nidhi Multi Service
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0757D9] bg-[#E8F5FF] px-2 py-0.5 rounded-md">
              {PLUMBING_SERVICES.length} Services
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {PLUMBING_SERVICES.map((srv) => (
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
                    Most Requested
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[#172033]">
                      {srv.title}
                    </h3>
                    <span className="text-[11px] text-[#0757D9] font-medium block mt-0.5">
                      Doorstep Plumbing Visit · Tiruppur
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
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                About The Service
              </h2>
              <p className="text-xs text-[#667085]">
                Sree Nidhi Multi Service in Perumanallur
              </p>
            </div>
          </div>

          <div className="text-xs leading-relaxed text-[#475467] flex flex-col gap-2.5">
            <p>
              Located on Nambiyur Road in Perumanallur, Tiruppur, Sree Nidhi Multi Service
              provides 24-hour plumbing repair and installation assistance for residential
              homes, apartment complexes, commercial establishments, and local textile units.
            </p>
            <p>
              Their experienced plumbing technicians address all water management needs,
              from emergency burst pipe repairs, CPVC line replacements, and wall mixer
              faucet fixing to commode installation, sink trap adjustments, overhead tank
              plumbing, and drainage choke removal with precision tools and durable fittings.
            </p>
          </div>

          {/* Quick Highlights */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
              <span className="font-bold text-xs text-[#0757D9] block">
                24 Hours Availability
              </span>
              <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
                Emergency call-out support for major leaks, burst pipes, and overflow issues.
              </p>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
              <span className="font-bold text-xs text-[#071B52] block">
                Durable Materials
              </span>
              <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
                Standardized ISI-grade CPVC, UPVC, PVC pipes, brass fittings, and branded valves.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: SERVICES AVAILABLE (2-Column Grid with clean plumbing icons) */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Services Available
            </h2>
            <p className="text-xs text-[#667085]">
              Full range of plumbing solutions offered
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
                Perumanallur & Tiruppur coverage
              </p>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Sree Nidhi Multi Service provides rapid on-site plumber visits originating from
            Nambiyur Road across Perumanallur and the wider Tiruppur municipal region:
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
            ⚡ 24/7 Fast plumber response · Transparent doorstep evaluation
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
                    Thank you! A technician from{' '}
                    <strong className="text-[#172033]">Sree Nidhi Multi Service</strong> will contact
                    you shortly to arrange a visit for your plumbing requirements in{' '}
                    <strong className="text-[#172033]">{address}</strong>.
                  </p>
                  <div className="mt-4 p-3 bg-[#F5F8FC] rounded-2xl w-full text-left text-xs text-[#475467] border border-[#E2E8F0]">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Service:</span>
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
                      Select Plumbing Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    >
                      {PLUMBING_SERVICES.map((srv) => (
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
                      placeholder="e.g. Murugesan"
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

                  {/* Location in Tiruppur / Perumanallur */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Location / Area in Tiruppur
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Perumanallur / Avinashi Road, Tiruppur"
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
                        'Immediate Emergency Visit',
                        'Today Morning',
                        'Today Afternoon',
                        'Tomorrow Slot',
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
