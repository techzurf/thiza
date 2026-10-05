import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Zap,
  Wind,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  Droplets,
  Calendar,
  X,
  Share2,
  Phone,
  Check,
} from 'lucide-react';

interface AcServiceDetailScreenProps {
  onBack: () => void;
  onEnquire?: () => void;
}

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
];

const SERVICES_LIST = [
  {
    id: 'deep-jet-clean',
    title: 'Split AC Deep Jet Cleaning',
    price: '₹449',
    originalPrice: '₹599',
    duration: '45 mins',
    popular: true,
    points: [
      'High-pressure jet pump wash of cooling coils & blower wheel',
      'Anti-bacterial chemical foam sanitization',
      'Condensate drain tray flush to prevent indoor dripping',
      '60-day cooling assurance warranty',
    ],
  },
  {
    id: 'ac-repair',
    title: 'Split AC Repair & Diagnosis',
    price: '₹299',
    originalPrice: '₹399',
    duration: '30-45 mins',
    popular: false,
    points: [
      'Comprehensive electrical, sensor & PCB diagnostic check',
      'Airflow velocity & temperature drop calibration',
      'Diagnosis of abnormal noise, vibration or foul odor',
      'Upfront transparent estimate before part replacement',
    ],
  },
  {
    id: 'gas-refill',
    title: 'AC Gas Refill & Leak Detection',
    price: '₹2,499',
    originalPrice: '₹2,999',
    duration: '60 mins',
    popular: false,
    points: [
      'High-pressure nitrogen leak test & copper tube brazing',
      'Moisture vacuum evacuation with industrial vacuum pump',
      '100% genuine ISI-certified R32 / R410A / R22 refrigerant charging',
      'Operating pressure & ampere load performance testing',
    ],
  },
  {
    id: 'installation',
    title: 'Split AC Installation & Uninstallation',
    price: '₹799',
    originalPrice: '₹999',
    duration: '60-90 mins',
    popular: false,
    points: [
      'Heavy-duty bracket mounting with vibration-damping pads',
      'Copper piping flare jointing, insulation & electrical cabling',
      'Vacuuming and gas leak testing prior to startup',
      'Indoor & outdoor unit perfect level alignment',
    ],
  },
  {
    id: 'amc-plan',
    title: 'Annual AC Maintenance Contract (AMC)',
    price: '₹1,499',
    originalPrice: '₹1,899',
    duration: '1 Year Plan',
    popular: false,
    points: [
      '2 Comprehensive Deep Jet Cleanings per year',
      'Unlimited breakdown visit calls & electrical checks',
      'Priority 4-hour technician dispatch in Tiruppur Bazaar',
      '10% discount on all spare parts & refrigerant top-up',
    ],
  },
];

const SERVICE_BENEFITS = [
  {
    icon: Wind,
    title: '30% – 40% Faster Cooling',
    desc: 'Unclogged cooling fins and a clean blower fan maximize high-velocity airflow across your room within minutes.',
  },
  {
    icon: Zap,
    title: 'Up to 25% Electricity Savings',
    desc: 'Reduces compressor thermal workload, preventing excessive energy spikes and lowering monthly power bills.',
  },
  {
    icon: Droplets,
    title: 'Zero Indoor Dripping & Leaks',
    desc: 'Mechanized flushing removes built-up slime, dirt and algae from drain trays and external drain conduits.',
  },
  {
    icon: ShieldCheck,
    title: '90-Day Service Warranty',
    desc: 'Backed by background-verified technicians, ISI-certified refrigerant gas, and doorstep post-service support.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Pre-Service Diagnostic Check',
    desc: 'Technician measures existing airflow, cooling temperature, grille differential, and electrical ampere load.',
  },
  {
    step: '02',
    title: 'AC Cover & Jacket Setup',
    desc: 'Indoor unit is enclosed in a waterproof funnel jacket to prevent any water splatter on your walls or furniture.',
  },
  {
    step: '03',
    title: 'High-Pressure Jet Pump Wash',
    desc: 'Eco-safe chemical foam is applied to cooling coils, blower fan, and air filters, followed by a pressure jet flush.',
  },
  {
    step: '04',
    title: 'Drain Tray Flush & Outdoor Clean',
    desc: 'Condensate drain line is cleared, and the outdoor condenser coil is power-washed to remove embedded dust.',
  },
  {
    step: '05',
    title: 'Cooling Test & Final Handover',
    desc: 'Unit is reassembled, temperature drop verified with a digital thermometer, and your service report issued.',
  },
];

const SERVICE_AREAS = [
  'Tiruppur Bazaar (Primary Hub)',
  'Kumaran Road',
  'Avinashi Road',
  'Dharapuram Road',
  'Kangeyam Road',
  'Palladam Road',
  'Rayapuram',
  'Gandhi Nagar',
  'College Road',
  'Anupparpalayam',
  'Veerapandi',
  'Uthukuli Road',
];

const SUPPORTED_BRANDS = [
  'Daikin',
  'LG',
  'Voltas',
  'Blue Star',
  'Hitachi',
  'Carrier',
  'Samsung',
  'Panasonic',
  'Lloyd',
  'Godrej',
  'Whirlpool',
  'Mitsubishi',
];

export const AcServiceDetailScreen: React.FC<AcServiceDetailScreenProps> = ({
  onBack,
  onEnquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Split AC Deep Jet Cleaning');
  const [copiedShare, setCopiedShare] = useState(false);

  // Form State for modal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Tiruppur Bazaar');
  const [preferredDate, setPreferredDate] = useState('Today (Express Slot)');
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
          title: 'Split AC Service in Tiruppur Bazaar - Tizara',
          text: 'Book certified Split AC repair, deep jet cleaning & gas refill in Tiruppur Bazaar starting at ₹299.',
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
            AC SERVICE
          </span>
          <span className="text-[10px] font-semibold text-[#0757D9]">
            Tiruppur Bazaar
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
        {/* Large AC Service Image & Gallery */}
        <section className="flex flex-col gap-2.5">
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-900 shadow-[0_4px_20px_rgba(7,27,82,0.08)] border border-[#E2E8F0]">
            <img
              src={GALLERY_IMAGES[activeImageIndex]}
              alt="Split AC Service in Tiruppur Bazaar"
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{ objectFit: 'cover' }}
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
                <span>Same-Day Service</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
              <span className="text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                Jet-Pump Foam Cleaning & Repairs
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
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Primary Title, Rating & Quick Details */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Doorstep Air Conditioner Specialists</span>
            </div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              Split AC Service
            </h1>
            <div className="flex items-center gap-1 text-xs font-medium text-[#667085] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0757D9] shrink-0" />
              <span>Tiruppur Bazaar, Tiruppur</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">Available Today</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#E8F5FF] text-[#0757D9] px-2 py-1 rounded-lg font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-[#0757D9] text-[#0757D9]" />
                <span>4.8</span>
              </div>
              <span className="text-xs text-[#667085]">
                (142 verified bookings)
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#667085] block">Starting from</span>
              <span className="text-base font-extrabold text-[#071B52]">
                ₹299
              </span>
            </div>
          </div>

          {/* Supported brands chip scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
            <span className="text-[11px] font-semibold text-[#667085] shrink-0">
              Brands:
            </span>
            {SUPPORTED_BRANDS.slice(0, 7).map((brand) => (
              <span
                key={brand}
                className="text-[10px] font-semibold text-[#0757D9] bg-[#F5F8FC] border border-[#E2E8F0] px-2 py-0.5 rounded-full shrink-0"
              >
                {brand}
              </span>
            ))}
          </div>

          {/* Primary Top Action Button */}
          <button
            type="button"
            onClick={() => handleOpenEnquiry('Split AC Deep Jet Cleaning')}
            className="w-full mt-2 bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] hover:opacity-95 text-white font-brand font-bold text-sm tracking-wide py-3.5 rounded-2xl shadow-md shadow-[#0757D9]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            <span>Send Free Enquiry</span>
          </button>
        </section>

        {/* SECTION: SERVICES AVAILABLE */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Services Available
              </h2>
              <p className="text-xs text-[#667085]">
                Certified multi-brand split AC solutions
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0757D9] bg-[#E8F5FF] px-2 py-0.5 rounded-md">
              {SERVICES_LIST.length} Options
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {SERVICES_LIST.map((srv) => (
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
                    Most Popular
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[#172033]">
                      {srv.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-extrabold text-base text-[#071B52]">
                        {srv.price}
                      </span>
                      <span className="text-xs text-[#98A2B3] line-through">
                        {srv.originalPrice}
                      </span>
                      <span className="text-[11px] text-[#667085] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#0757D9]" />
                        {srv.duration}
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
            ))}
          </div>
        </section>

        {/* SECTION: ABOUT THE SERVICE */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center font-bold">
              AC
            </div>
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                About The Service
              </h2>
              <p className="text-xs text-[#667085]">
                Split AC service across Tiruppur Bazaar
              </p>
            </div>
          </div>

          <div className="text-xs leading-relaxed text-[#475467] flex flex-col gap-2.5">
            <p>
              Tizara connects you with certified, background-verified technicians
              delivering prompt split air conditioner servicing, high-pressure jet pump
              wash, compressor inspection, and gas refilling directly to your doorstep in
              Tiruppur Bazaar and nearby localities.
            </p>
            <p>
              Whether your air conditioner is struggling with weak cooling, unusual rattling
              noises, foul water odors, clogged filter mesh, or refrigerant leakage, our
              technicians bring specialized spill-proof collection jackets, digital pressure
              gauges, and genuine replacement spare parts to service your AC without dirtying
              walls or surrounding floors.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            <div className="bg-[#F5F8FC] rounded-2xl p-2.5 text-center border border-[#E2E8F0]/60">
              <span className="font-extrabold text-sm text-[#0757D9] block">
                45 Mins
              </span>
              <span className="text-[10px] text-[#667085] leading-tight block mt-0.5">
                Average Service Time
              </span>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-2.5 text-center border border-[#E2E8F0]/60">
              <span className="font-extrabold text-sm text-[#0757D9] block">
                90 Days
              </span>
              <span className="text-[10px] text-[#667085] leading-tight block mt-0.5">
                Service Warranty
              </span>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-2.5 text-center border border-[#E2E8F0]/60">
              <span className="font-extrabold text-sm text-[#0757D9] block">
                100%
              </span>
              <span className="text-[10px] text-[#667085] leading-tight block mt-0.5">
                Pure Refrigerant
              </span>
            </div>
          </div>
        </section>

        {/* SECTION: WHY SERVICE YOUR AC? */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Why Service Your AC?
            </h2>
            <p className="text-xs text-[#667085]">
              Key benefits of regular split AC maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICE_BENEFITS.map((item, idx) => {
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

        {/* SECTION: SERVICE DETAILS (Step-by-step process) */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-base text-[#172033]">
              Service Details & Process
            </h2>
            <p className="text-xs text-[#667085]">
              How our certified 5-step deep servicing works
            </p>
          </div>

          <div className="flex flex-col gap-3 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-slate-200">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#0757D9] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {step.step}
                </div>
                <div className="flex-1 bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
                  <h4 className="font-bold text-xs text-[#172033]">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#667085] mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
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
                Tiruppur Bazaar and covered localities
              </p>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Doorstep technician visits available across all major neighborhoods in and
            around Tiruppur Bazaar within 45 to 60 minutes of booking confirmation:
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
            ⚡ Free doorstep quote · No upfront payment required
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
                    Thank you! An authorized AC technician covering{' '}
                    <strong className="text-[#172033]">Tiruppur Bazaar</strong> will call or
                    WhatsApp you shortly to confirm your preferred slot.
                  </p>
                  <div className="mt-4 p-3 bg-[#F5F8FC] rounded-2xl w-full text-left text-xs text-[#475467] border border-[#E2E8F0]">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Service:</span>
                      <span className="font-bold text-[#172033]">{selectedService}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Area:</span>
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
                  {/* Service Selection */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Selected Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    >
                      {SERVICES_LIST.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title} ({srv.price})
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
                      placeholder="e.g. Ramesh Kumar"
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

                  {/* Service Location / Address in Tiruppur */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Service Address / Locality
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Near Usha Theater, Tiruppur Bazaar"
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
                        'Today (Express Slot)',
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
