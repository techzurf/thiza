import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  Calendar,
  X,
  Share2,
  Phone,
  Check,
  Bug,
  Home,
  Building2,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface PestControlDetailScreenProps {
  onBack: () => void;
  onEnquire?: () => void;
}

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80',
];

const SERVICES_LIST = [
  {
    id: 'cockroach-control',
    title: 'Cockroach Control',
    popular: true,
    points: [
      'Advanced 4D GoldSeal Gel Baiting & targeted crack/crevice treatment',
      'Odorless chemical application safe for kitchens, food prep & pets',
      'Destroys cockroach colonies and hidden egg cases',
      'Targeted for both German & American cockroaches',
    ],
  },
  {
    id: 'termite-control',
    title: 'Termite Control',
    popular: false,
    points: [
      'Pre-construction and post-construction subterranean termite treatments',
      'Drill-Fill-Seal chemical barrier technology along skirting & walls',
      'Long-term structural wood and foundation protection',
      'Comprehensive inspection with specialized detection tools',
    ],
  },
  {
    id: 'rodent-control',
    title: 'Rodent Control',
    popular: false,
    points: [
      'Integrated Rodent Management for rats and mice',
      'Tamper-resistant bait stations and mechanical snap traps',
      'Burrow baiting and entry point proofing inspection',
      'Tailored for residential homes, textile units, and godowns',
    ],
  },
  {
    id: 'mosquito-control',
    title: 'Mosquito Control',
    popular: false,
    points: [
      'Indoor thermal fogging & cold misting sprays',
      'Larvicidal treatment in standing water bodies and drainage conduits',
      'Reduces mosquito breeding sources and disease vectors',
      'Safe outdoor barrier spray for lawns and industrial compounds',
    ],
  },
  {
    id: 'bedbug-control',
    title: 'Bed Bug Control',
    popular: false,
    points: [
      'Multi-stage targeted chemical contact spray & residual treatment',
      'Deep treatment of mattress seams, bed frames, furniture and crevices',
      'Eliminates live bed bugs and prevents subsequent hatching cycles',
      'Scheduled follow-up inspection to confirm total eradication',
    ],
  },
  {
    id: 'general-pest-control',
    title: 'General Pest Control',
    popular: false,
    points: [
      'Broad-spectrum treatment targeting ants, silverfish, spiders & flies',
      'Perimeter residual barrier around windows, doorways and vents',
      'Safe, government-approved eco-friendly formulations',
      'Routine maintenance programs for homes and business premises',
    ],
  },
];

const PESTS_CONTROLLED = [
  {
    name: 'Cockroaches',
    desc: 'German & American roaches in kitchens & drains',
    badge: 'High Threat',
    bg: 'bg-rose-50 text-rose-700 border-rose-200/60',
  },
  {
    name: 'Termites',
    desc: 'White ants damaging woodwork & structural foundations',
    badge: 'Wood Threat',
    bg: 'bg-amber-50 text-amber-700 border-amber-200/60',
  },
  {
    name: 'Rodents',
    desc: 'Rats & mice gnawing wires & contaminating inventory',
    badge: 'Health Risk',
    bg: 'bg-orange-50 text-orange-700 border-orange-200/60',
  },
  {
    name: 'Mosquitoes',
    desc: 'Breeding vectors transmitting dengue & malaria',
    badge: 'Seasonal',
    bg: 'bg-blue-50 text-blue-700 border-blue-200/60',
  },
  {
    name: 'Bed Bugs',
    desc: 'Nocturnal blood-feeding pests in beds & sofas',
    badge: 'Bite Alert',
    bg: 'bg-purple-50 text-purple-700 border-purple-200/60',
  },
  {
    name: 'Flies & Ants',
    desc: 'Houseflies, black ants & crawling insects',
    badge: 'Common',
    bg: 'bg-slate-50 text-slate-700 border-slate-200/60',
  },
];

const WHY_CHOOSE_BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Science-Based IPM Approach',
    desc: 'Integrated Pest Management focuses on pest biology, exclusion, sanitation, and targeted baiting rather than indiscriminate spraying.',
  },
  {
    icon: Sparkles,
    title: 'Safe, Odorless Formulations',
    desc: 'Government-approved, low-toxicity eco-friendly products safe for children, seniors, pets, and food preparation areas.',
  },
  {
    icon: Home,
    title: 'Residential & Commercial Scope',
    desc: 'Custom solutions for individual apartments, independent houses, garment factories, spinning mills, retail shops, and warehouses.',
  },
  {
    icon: Zap,
    title: 'Certified & Trained Technicians',
    desc: 'Skilled pest specialists equipped with advanced personal protective equipment, precision sprayers, and inspection instruments.',
  },
];

const SERVICE_AREAS = [
  'Tiruppur (All Zones)',
  'Stanes Road',
  'PN Road',
  'Avinashi Road',
  'Dharapuram Road',
  'Kangeyam Road',
  'Palladam Road',
  'Tiruppur Bazaar',
  'Rayapuram',
  'Gandhi Nagar',
  'College Road',
  'Veerapandi & Industrial Clusters',
];

export const PestControlDetailScreen: React.FC<PestControlDetailScreenProps> = ({
  onBack,
  onEnquire,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Cockroach Control');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [copiedShare, setCopiedShare] = useState(false);

  // Form State for modal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Tiruppur');
  const [preferredDate, setPreferredDate] = useState('Today (Express Inspection)');
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
          title: 'Pest Control Services in Tiruppur - Tizara',
          text: 'Book certified pest control for cockroaches, termites, rodents, and mosquitoes in Tiruppur.',
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
            PEST CONTROL
          </span>
          <span className="text-[10px] font-semibold text-[#0757D9]">
            Tiruppur
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
        {/* Large Pest Control Image & Gallery */}
        <section className="flex flex-col gap-2.5">
          <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-900 shadow-[0_4px_20px_rgba(7,27,82,0.08)] border border-[#E2E8F0]">
            <img
              src={GALLERY_IMAGES[activeImageIndex]}
              alt="Pest Control Services in Tiruppur"
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
                <span>Homes & Businesses</span>
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
              <span className="text-xs font-semibold drop-shadow-md bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                Odorless & Safe Treatments
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
                  alt={`Pest Control Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Primary Title, Location & Quick Info */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Integrated Pest Management</span>
            </div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              Pest Control Services
            </h1>
            <div className="flex items-center gap-1 text-xs font-medium text-[#667085] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0757D9] shrink-0" />
              <span>Tiruppur, Tamil Nadu</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">Doorstep Inspection</span>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Professional pest control solutions for homes and businesses across Tiruppur.
            Eliminate cockroaches, termites, rodents, mosquitoes, and bed bugs with
            government-approved, odorless formulations.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#E8F5FF] text-[#0757D9] px-2 py-1 rounded-lg font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-[#0757D9] text-[#0757D9]" />
                <span>4.9</span>
              </div>
              <span className="text-xs text-[#667085]">
                (180+ verified inspections)
              </span>
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
            onClick={() => handleOpenEnquiry('Cockroach Control')}
            className="w-full mt-2 bg-gradient-to-r from-[#0757D9] via-[#008CFF] to-[#00D0F5] hover:opacity-95 text-white font-brand font-bold text-sm tracking-wide py-3.5 rounded-2xl shadow-md shadow-[#0757D9]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            <span>Send Free Enquiry</span>
          </button>
        </section>

        {/* SECTION: PEST CONTROL SERVICES */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Pest Control Services
              </h2>
              <p className="text-xs text-[#667085]">
                Targeted treatments for residential & commercial sites
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0757D9] bg-[#E8F5FF] px-2 py-0.5 rounded-md">
              {SERVICES_LIST.length} Services
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
                    Most Requested
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[#172033]">
                      {srv.title}
                    </h3>
                    <span className="text-[11px] text-[#0757D9] font-medium block mt-0.5">
                      Tailored Treatment Plan
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

        {/* SECTION: ABOUT PEST CONTROL */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5FF] text-[#0757D9] flex items-center justify-center font-bold">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                About Pest Control
              </h2>
              <p className="text-xs text-[#667085]">
                Expert pest protection across Tiruppur
              </p>
            </div>
          </div>

          <div className="text-xs leading-relaxed text-[#475467] flex flex-col gap-2.5">
            <p>
              Tizara brings professional, science-backed pest management solutions to homes,
              textile facilities, commercial complexes, and offices in Tiruppur. Combining
              proven pest control methodologies with localized knowledge of Tiruppur’s climate
              and commercial infrastructure, our service partners deliver targeted treatments
              that eliminate active infestations and establish long-lasting defensive barriers.
            </p>
            <p>
              From specialized gel baiting for kitchen cockroaches and drill-fill-seal barrier
              technology for subterranean termites to tamper-proof rodent stations and thermal
              fogging for mosquitoes, all treatments utilize government-approved, low-toxicity
              formulations to safeguard family health, employees, food items, and fabrics.
            </p>
          </div>

          {/* Coverage Scope Cards */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
            <div className="bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#0757D9] mb-1">
                <Home className="w-3.5 h-3.5" />
                <span>Residential Protection</span>
              </div>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                Apartments, independent houses, and villas. Non-disruptive, odorless kitchen and bedroom treatments.
              </p>
            </div>
            <div className="bg-[#F5F8FC] rounded-2xl p-3 border border-[#E2E8F0]/70">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#071B52] mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Commercial & Industrial</span>
              </div>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                Garment export units, spinning mills, retail stores, food premises, and corporate offices with audit compliance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: PESTS WE HELP CONTROL */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Pests We Help Control
            </h2>
            <p className="text-xs text-[#667085]">
              Targeted eradication across key pest categories
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {PESTS_CONTROLLED.map((pest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3.5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-[#172033]">
                      {pest.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${pest.bg}`}
                    >
                      {pest.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#667085] leading-tight">
                    {pest.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEnquiry(`${pest.name} Control`)}
                  className="text-[11px] font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 self-start pt-1"
                >
                  <span>Request Treatment</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: WHY CHOOSE PROFESSIONAL PEST CONTROL? (2-column layout) */}
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-brand font-bold text-lg text-[#172033]">
              Why Choose Professional Pest Control?
            </h2>
            <p className="text-xs text-[#667085]">
              Proven benefits of certified pest management
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

        {/* SECTION: SERVICE AREA */}
        <section className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0757D9] shrink-0" />
            <div>
              <h2 className="font-brand font-bold text-base text-[#172033]">
                Service Area
              </h2>
              <p className="text-xs text-[#667085]">
                Tiruppur branch & surrounding localities
              </p>
            </div>
          </div>

          <p className="text-xs text-[#475467] leading-relaxed">
            Doorstep pest inspections and scheduled service visits available across all
            residential and industrial sectors in Tiruppur:
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
            ⚡ Free doorstep consultation · Odorless & safe chemical treatments
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
                    Thank you! A certified pest control specialist covering{' '}
                    <strong className="text-[#172033]">Tiruppur</strong> will contact you shortly
                    to arrange an inspection and provide a tailored treatment quote.
                  </p>
                  <div className="mt-4 p-3 bg-[#F5F8FC] rounded-2xl w-full text-left text-xs text-[#475467] border border-[#E2E8F0]">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-[#667085]">Treatment:</span>
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
                      Select Pest Problem
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    >
                      {SERVICES_LIST.map((srv) => (
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
                      placeholder="e.g. Anand Sivakumar"
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

                  {/* Location in Tiruppur */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Property Location / Area in Tiruppur
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Stanes Road / Avinashi Road, Tiruppur"
                      className="w-full bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0757D9]/30"
                    />
                  </div>

                  {/* Preferred Slot */}
                  <div>
                    <label className="text-xs font-bold text-[#172033] block mb-1.5">
                      Preferred Inspection Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Today (Express Inspection)',
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
