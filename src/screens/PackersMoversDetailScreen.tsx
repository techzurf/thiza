import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  X,
  Share2,
  Check,
  Home,
  Building2,
  Package,
  Layers,
  Warehouse,
  Boxes,
  Compass,
  Globe2,
} from 'lucide-react';

interface PackersMoversDetailScreenProps {
  onBack: () => void;
  onEnquire?: () => void;
}

const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    title: 'Moving & Relocation Service',
  },
  {
    url: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1000&q=80',
    title: 'Professional Packing Materials',
  },
  {
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
    title: 'Modern Transportation & Truck Fleet',
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    title: 'Safe Warehousing & Storage',
  },
];

const OUR_SERVICES = [
  {
    id: 'home-shifting',
    title: 'Home Shifting',
    popular: true,
    icon: Home,
    points: [
      'Comprehensive residential relocation for apartments, flats, and villas',
      'Protective bubble wrapping for glassware, electronics, and delicate artifacts',
      'Systematic furniture dismantling, tagging, and re-assembly at your new home',
      'Careful handling of kitchen utensils, wardrobes, and heavy home appliances',
    ],
  },
  {
    id: 'office-shifting',
    title: 'Office Shifting',
    popular: false,
    icon: Building2,
    points: [
      'Organized corporate relocations structured to ensure minimal business downtime',
      'Specialized handling of IT infrastructure, computer servers, and archives',
      'Dismantling and re-erecting office cubicles, conference tables & fixtures',
      'Flexible weekend and night-shift relocation scheduling options',
    ],
  },
  {
    id: 'local-shifting',
    title: 'Local Shifting',
    popular: false,
    icon: Compass,
    points: [
      'Fast, same-day intra-city relocations with prompt doorstep vehicle arrival',
      'Dedicated closed container trucks designed for city transit and tight streets',
      'On-time dispatch with trained local moving crew and experienced supervisors',
      'Complete room-to-room placement with itemized inventory checklists',
    ],
  },
  {
    id: 'domestic-relocation',
    title: 'Domestic Relocation',
    popular: false,
    icon: Globe2,
    points: [
      'Inter-city and long-distance moving across Tamil Nadu and all states in India',
      'Direct highway container transit with GPS route monitoring and status updates',
      'All-weather weatherproof closed container fleet shielding goods from rain and dust',
      'Hassle-free toll, checkpost, and interstate transit document assistance',
    ],
  },
  {
    id: 'packing-unpacking',
    title: 'Packing & Unpacking',
    popular: false,
    icon: Package,
    points: [
      'World-class packing using premium bubble wrap, corrugated sheets & stretch films',
      'Customized wooden crates for televisions, luxury paintings, and fragile decor',
      'Room-wise color-coded labeling for effortless identification and unboxing',
      'Unpacking assistance and complete cleanup of packing material debris',
    ],
  },
  {
    id: 'loading-unloading',
    title: 'Loading & Unloading',
    popular: false,
    icon: Boxes,
    points: [
      'Trained physical handling crew utilizing dollies, ramps, and heavy-duty straps',
      'Zero-scratch transit techniques preventing wall scuffs and staircase damage',
      'Balanced truck loading to eliminate cargo shifting during vehicle transit',
      'Smooth floor-by-floor unloading with elevator and manual carry capability',
    ],
  },
  {
    id: 'transportation',
    title: 'Transportation',
    popular: false,
    icon: Truck,
    points: [
      'Fleet of well-maintained closed container vehicles and open-bed carriers',
      'Vehicle and car transportation with specialized wheel chocks and safety lashings',
      'Experienced commercial drivers with extensive national highway route familiarity',
      'Dedicated and shared load container options suited to consignment size',
    ],
  },
  {
    id: 'storage-warehousing',
    title: 'Storage / Warehousing',
    popular: false,
    icon: Warehouse,
    points: [
      'Clean, pest-controlled storage facilities for short-term and extended durations',
      'Round-the-clock CCTV surveillance and gated warehouse security protocols',
      'Moisture-resistant palletized storage safeguarding furniture and household goods',
      'Easy retrieval process with itemized digital inventory logging',
    ],
  },
];

const RELOCATION_SERVICES_GRID = [
  {
    icon: Home,
    title: 'Home Shifting',
    desc: 'Safe door-to-door residential moving',
  },
  {
    icon: Building2,
    title: 'Office Shifting',
    desc: 'Corporate moving with minimal downtime',
  },
  {
    icon: Compass,
    title: 'Local Shifting',
    desc: 'Same-day city moving with dedicated trucks',
  },
  {
    icon: Globe2,
    title: 'Domestic Relocation',
    desc: 'Inter-city moves across states in India',
  },
  {
    icon: Package,
    title: 'Packing & Unpacking',
    desc: 'Multi-layer bubble wrap & box crating',
  },
  {
    icon: Boxes,
    title: 'Loading & Unloading',
    desc: 'Skilled crew with straps & dollies',
  },
  {
    icon: Truck,
    title: 'Transportation',
    desc: 'Weatherproof closed container trucks',
  },
  {
    icon: Warehouse,
    title: 'Storage / Warehousing',
    desc: 'Secure short & long-term storage space',
  },
];

const SERVICE_AREAS = [
  'Chennai (Head Office)',
  'Tiruppur & Coimbatore Corridor',
  'Bangalore',
  'Hyderabad',
  'Pune (Ranjangaon & Pimpri)',
  'Noida / Delhi NCR',
  'Tamil Nadu Statewide Network',
  'All Major Domestic Routes Across India',
];

const WHY_CHOOSE_BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Secure & Timely Delivery',
    desc: 'Prioritizing the safety of your valuables with strict timelines and zero-compromise punctuality on every relocation.',
  },
  {
    icon: Package,
    title: 'World-Class Quality Packing',
    desc: 'Utilization of multi-layer bubble wrap, heavy-duty corrugated cartons, edge protectors, and waterproof stretch wraps.',
  },
  {
    icon: Truck,
    title: 'Modern Weatherproof Container Fleet',
    desc: 'All-weather closed containers shielding your household and office goods from rain, moisture, heat, and roadway dust.',
  },
  {
    icon: Clock,
    title: '24/7 Relocation Support',
    desc: 'Round-the-clock customer coordination, transparent route updates, and prompt doorstep assistance whenever you need it.',
  },
];

export const PackersMoversDetailScreen: React.FC<PackersMoversDetailScreenProps> = ({
  onBack,
  onEnquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Home Shifting');
  const [moveType, setMoveType] = useState<'local' | 'domestic'>('local');
  const [copiedShare, setCopiedShare] = useState(false);

  // Form State for modal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fromCity, setFromCity] = useState('Tiruppur');
  const [toCity, setToCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('This Weekend');
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
          title: 'Vikas Packers & Movers - Tizara',
          text: 'Book verified household and commercial relocation with Vikas Packers & Movers on Tizara.',
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
            PACKERS & MOVERS
          </span>
          <span className="text-[10px] font-semibold text-[#0757D9] truncate">
            Vikas Packers & Movers
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
        {/* Large Moving Service Image & Gallery */}
        <section className="flex flex-col gap-2.5">
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-900 shadow-[0_4px_20px_rgba(7,27,82,0.08)] border border-[#E2E8F0]">
            <img
              src={GALLERY_IMAGES[activeImageIndex].url}
              alt={GALLERY_IMAGES[activeImageIndex].title}
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Gradient shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating badges on image */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
              <span className="inline-flex items-center gap-1 bg-[#0757D9]/90 backdrop-blur-md text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D0F5]" />
                <span>Verified Moving Partner</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>24/7 Support · Closed Containers</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
              <span className="text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                {GALLERY_IMAGES[activeImageIndex].title}
              </span>
              <span className="text-[11px] font-bold bg-white/25 px-2 py-0.5 rounded-md backdrop-blur-xs">
                {activeImageIndex + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </div>

          {/* Horizontal Image Gallery Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {GALLERY_IMAGES.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all active:scale-95 ${
                  activeImageIndex === idx
                    ? 'border-[#0757D9] shadow-sm scale-102 ring-2 ring-[#0757D9]/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover object-center"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Business Title, Category & Top Info */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Full-Service Packing & Shifting</span>
            </div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              Vikas Packers & Movers
            </h1>
            <p className="text-xs font-semibold text-[#0757D9] mt-0.5">
              Professional Packing & Relocation Services
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-[#667085]">
              <Clock className="w-3.5 h-3.5 text-[#0757D9]" />
              <span>24/7 Customer Coordination</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0757D9] bg-[#E8F5FF] px-2.5 py-1 rounded-full">
                <Truck className="w-3 h-3 text-[#0757D9]" />
                <span>Closed Container Fleet</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Vikas Packers & Movers delivers reliable household shifting, office relocation,
            local moving, domestic transportation, and warehousing solutions across India
            with world-class packing materials and skilled moving professionals.
          </p>

          {/* Primary Top Action Button */}
          <button
            type="button"
            onClick={() => handleOpenEnquiry('Home Shifting')}
            className="w-full mt-2 bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] hover:opacity-95 text-white font-brand font-bold text-sm tracking-wide py-3.5 rounded-2xl shadow-md shadow-[#0757D9]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            <span>Send Free Enquiry</span>
          </button>
        </section>

        {/* SECTION: OUR SERVICES */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Our Services
              </h2>
              <p className="text-xs text-[#667085]">
                Actual services offered by Vikas Packers & Movers
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0757D9] bg-[#E8F5FF] px-2 py-0.5 rounded-md">
              {OUR_SERVICES.length} Services
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {OUR_SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
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
                      Most Booked
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#172033]">
                          {srv.title}
                        </h3>
                        <span className="text-[11px] text-[#0757D9] font-medium block mt-0.5">
                          Local & Domestic Shifting
                        </span>
                      </div>
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
              );
            })}
          </div>
        </section>

        {/* SECTION: ABOUT VIKAS PACKERS & MOVERS */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                About Vikas Packers & Movers
              </h2>
              <p className="text-xs text-[#667085]">
                Professional Moving & Relocation
              </p>
            </div>
          </div>

          <div className="text-xs leading-relaxed text-[#475467] flex flex-col gap-2.5">
            <p>
              Vikas Packers & Movers is an established moving organization offering end-to-end
              relocation services across Tamil Nadu and major cities nationwide. They specialize
              in household shifting, corporate office relocations, vehicle transit, and secure
              warehousing solutions.
            </p>
            <p>
              The company emphasizes safe and punctual transit through high-grade multi-layer
              packaging materials, customized wooden crates for electronics, skilled loading
              and unloading personnel, and a dedicated fleet of all-weather closed container
              trucks backed by 24/7 customer coordination.
            </p>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            <div className="bg-[#F5F8FC] rounded-2xl p-2.5 text-center border border-[#E2E8F0]/60">
              <span className="font-extrabold text-sm text-[#0757D9] block">
                Pan-India
              </span>
              <span className="text-[10px] text-[#667085] leading-tight block mt-0.5">
                Relocation Network
              </span>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-2.5 text-center border border-[#E2E8F0]/60">
              <span className="font-extrabold text-sm text-[#0757D9] block">
                24/7
              </span>
              <span className="text-[10px] text-[#667085] leading-tight block mt-0.5">
                Moving Support
              </span>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-2.5 text-center border border-[#E2E8F0]/60">
              <span className="font-extrabold text-sm text-[#0757D9] block">
                100%
              </span>
              <span className="text-[10px] text-[#667085] leading-tight block mt-0.5">
                Closed Containers
              </span>
            </div>
          </div>
        </section>

        {/* SECTION: RELOCATION SERVICES (Modern 2-Column Grid) */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Relocation Services
            </h2>
            <p className="text-xs text-[#667085]">
              Overview of core relocation solutions available
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {RELOCATION_SERVICES_GRID.map((item, idx) => {
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

        {/* SECTION: SERVICE AREAS */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0757D9] shrink-0" />
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                Service Areas
              </h2>
              <p className="text-xs text-[#667085]">
                Actual locations and transit corridors
              </p>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Vikas Packers & Movers operates across key urban centers and nationwide domestic routes:
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

        {/* SECTION: WHY CHOOSE US */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Why Choose Us
            </h2>
            <p className="text-xs text-[#667085]">
              Core advantages supported by Vikas Packers & Movers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY_CHOOSE_BENEFITS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-xs flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#172033]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Prominent CTA */}
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
            ⚡ Free doorstep relocation estimate · Zero-obligation quote
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
                    Thank you! A moving coordinator from{' '}
                    <strong className="text-[#172033]">Vikas Packers & Movers</strong> will contact
                    you shortly to calculate shipment volume and provide a free relocation estimate.
                  </p>
                  <div className="mt-4 p-3 bg-[#F5F8FC] rounded-2xl w-full text-left text-xs text-[#475467] border border-[#E2E8F0]">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Service:</span>
                      <span className="font-bold text-[#172033]">{selectedService}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Relocation:</span>
                      <span className="font-bold text-[#172033] capitalize">{moveType} Moving</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">From:</span>
                      <span className="font-bold text-[#172033]">{fromCity}</span>
                    </div>
                    {toCity && (
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-[#667085]">To:</span>
                        <span className="font-bold text-[#172033]">{toCity}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1">
                      <span className="text-[#667085]">Contact:</span>
                      <span className="font-bold text-[#172033]">{phone || '+91 91500 48577'}</span>
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
                  {/* Move Type Toggle */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Shifting Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMoveType('local')}
                        className={`text-xs font-bold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          moveType === 'local'
                            ? 'bg-[#E8F5FF] text-[#0757D9] border-[#0757D9]'
                            : 'bg-[#F5F8FC] text-[#475467] border-[#E2E8F0]'
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Local Moving</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMoveType('domestic')}
                        className={`text-xs font-bold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          moveType === 'domestic'
                            ? 'bg-[#E8F5FF] text-[#0757D9] border-[#0757D9]'
                            : 'bg-[#F5F8FC] text-[#475467] border-[#E2E8F0]'
                        }`}
                      >
                        <Globe2 className="w-3.5 h-3.5" />
                        <span>Domestic / Inter-City</span>
                      </button>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Select Relocation Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    >
                      {OUR_SERVICES.map((srv) => (
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
                      placeholder="e.g. Vikas Kumar"
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
                        placeholder="91500 48577"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl pl-11 pr-3 py-2.5 text-xs text-[#172033] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                      />
                    </div>
                  </div>

                  {/* From and To Cities */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1.5">
                        Moving From (Pickup)
                      </label>
                      <input
                        type="text"
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                        placeholder="e.g. Tiruppur / Chennai"
                        className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#172033] block mb-1.5">
                        Moving To (Drop)
                      </label>
                      <input
                        type="text"
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                        placeholder="e.g. Bangalore / Coimbatore"
                        className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                      />
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Preferred Moving Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'This Weekend',
                        'Within 7 Days',
                        'End of Month',
                        'Next Month',
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
                      <span>Calculating Quote...</span>
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
