import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Building2,
  MapPin,
  Camera,
  CheckCircle2,
  Upload,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockBusinesses';

interface ListBusinessScreenProps {
  onBack: () => void;
  onBusinessAdded: (newBusiness: any) => void;
}

export const ListBusinessScreen: React.FC<ListBusinessScreenProps> = ({
  onBack,
  onBusinessAdded,
}) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [phone, setPhone] = useState('+91 ');
  const [whatsapp, setWhatsapp] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Chennai');
  const [openingHours, setOpeningHours] = useState('09:00 AM - 09:00 PM (Daily)');

  const [hasLogo, setHasLogo] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSuccess(true);
    }
  };

  const handleFinish = () => {
    const newBiz = {
      id: `b_user_${Date.now()}`,
      name: businessName || 'My New Business',
      tagline: description.slice(0, 60) || 'Quality local services & products',
      category,
      categoryName: CATEGORIES.find((c) => c.id === category)?.name || 'Services',
      rating: 5.0,
      reviewCount: 1,
      distance: '0.2 km',
      isOpen: true,
      openingHours: openingHours || '09:00 AM - 09:00 PM',
      address: address || '123, Main Road',
      locality: locality || 'T. Nagar',
      city,
      phone: phone || '+91 98400 00000',
      whatsapp: whatsapp || '+91 98400 00000',
      email,
      website,
      description: description || 'Welcome to our verified business listed on Tizara.',
      isVerified: true,
      isFeatured: false,
      priceRange: '₹₹',
      lat: 13.04,
      lng: 80.24,
      coverImage: 'linear-gradient(135deg, #071B52 0%, #0757D9 50%, #08D9F5 100%)',
      logo: (businessName || 'MB').slice(0, 2).toUpperCase(),
      gallery: ['linear-gradient(135deg, #071B52, #0757D9)'],
      services: [
        { id: 's_new_1', name: 'Primary Service / Product', price: '₹499', description: 'Standard quality package' }
      ],
      reviews: [],
      offers: [],
    };
    onBusinessAdded(newBiz);
  };

  if (isSuccess) {
    return (
      <div className="w-full min-h-[100dvh] bg-white flex flex-col justify-between p-6 select-none">
        <div className="pt-safe flex items-center justify-center">
          <span className="text-xs font-bold text-[#0757D9] uppercase tracking-wider">
            Registration Complete
          </span>
        </div>

        <div className="my-auto flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0757D9] mb-6 shadow-md shadow-[#0757D9]/10 animate-bounce duration-1000">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>

          <h2 className="font-brand font-extrabold text-2xl text-[#172033]">
            Business Listed Successfully!
          </h2>

          <p className="text-sm text-[#667085] mt-2 leading-relaxed">
            Congratulations! <strong className="text-[#172033]">{businessName || 'Your Business'}</strong> is now live on the Tizara network. Customers in Chennai can now discover your services and send enquiries.
          </p>

          <div className="bg-[#F5F8FC] border border-[#E2E8F0] p-4 rounded-2xl w-full mt-6 text-left">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
              <span className="text-[#667085]">Status:</span>
              <span className="font-bold text-emerald-600">Active & Verified</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-[#667085]">Category:</span>
              <span className="font-bold text-[#0757D9]">
                {CATEGORIES.find((c) => c.id === category)?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="pb-safe max-w-sm mx-auto w-full">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full h-13 rounded-2xl bg-tizara-gradient text-white font-brand font-bold text-base shadow-lg shadow-[#0757D9]/25 active:scale-[0.98] transition-transform"
          >
            Go to My Business Dashboard
          </button>
        </div>
      </div>
    );
  }

  const stepTitles = [
    'Business Information',
    'Location & Hours',
    'Media & Branding',
    'Review & Submit',
  ];

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
              List Your Business
            </h1>
            <p className="text-xs text-[#667085]">
              Reach more customers and grow your business
            </p>
          </div>
        </div>

        {/* 4 Steps Stepper */}
        <div className="flex items-center justify-between mt-4 px-2">
          {[1, 2, 3, 4].map((s) => {
            const isCompleted = step > s;
            const isCurrent = step === s;
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-[#0757D9] text-white ring-4 ring-[#0757D9]/20'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s}
                </div>

                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                      step > s ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Step Form Content */}
      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-4">
          <span className="text-[11px] font-bold text-[#0757D9] uppercase tracking-wider">
            Step {step} of 4
          </span>
          <h2 className="font-brand font-extrabold text-lg text-[#172033]">
            {stepTitles[step - 1]}
          </h2>
        </div>

        {/* STEP 1: Business Info */}
        {step === 1 && (
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Business Name *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Modern Tech Solutions"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Primary Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98400 00000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                WhatsApp Business Number
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 98400 00000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Business Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Highlight your services, products, expertise..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {step === 2 && (
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Shop / Office Address *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Door No, Street Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Locality / Area *
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. T. Nagar, Anna Nagar, Alwarpet"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                City *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Opening Hours
              </label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="e.g. 09:30 AM - 09:00 PM (Daily)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Photos */}
        {step === 3 && (
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Business Logo
              </label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setHasLogo(!hasLogo)}
                onKeyDown={(e) => e.key === 'Enter' && setHasLogo(!hasLogo)}
                className="w-full border-2 border-dashed border-[#008CFF]/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F5F8FC] transition-colors"
              >
                {hasLogo ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                    <span>Logo uploaded successfully!</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-[#0757D9] mb-2" />
                    <p className="text-xs font-bold text-[#172033]">
                      Tap to upload Business Logo
                    </p>
                    <p className="text-[10px] text-[#667085] mt-0.5">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Storefront & Product Photos
              </label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setPhotoCount((prev) => (prev < 4 ? prev + 1 : 1))}
                onKeyDown={(e) => e.key === 'Enter' && setPhotoCount((prev) => (prev < 4 ? prev + 1 : 1))}
                className="w-full border-2 border-dashed border-[#008CFF]/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F5F8FC] transition-colors"
              >
                <Camera className="w-8 h-8 text-[#0757D9] mb-2" />
                <p className="text-xs font-bold text-[#172033]">
                  Tap to add Showcase Photos
                </p>
                <p className="text-[10px] text-[#667085] mt-0.5">
                  {photoCount > 0 ? `${photoCount} photos added` : 'Add up to 5 photos'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {step === 4 && (
          <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col gap-3.5">
            <div className="bg-gradient-to-r from-[#071B52] to-[#0757D9] text-white p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#08D9F5]">
                Ready for Verification
              </span>
              <h3 className="font-brand font-extrabold text-lg mt-0.5">
                {businessName || 'My New Business'}
              </h3>
              <p className="text-xs text-white/80">
                {CATEGORIES.find((c) => c.id === category)?.name} · {locality || 'Chennai'}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs pt-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#667085]">Contact:</span>
                <span className="font-semibold text-[#172033]">{phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-[#667085]">Address:</span>
                <span className="font-semibold text-[#172033] truncate max-w-[200px]">
                  {address || '123 Main Road'}, {locality || 'Chennai'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#667085]">Operating Hours:</span>
                <span className="font-semibold text-[#172033]">{openingHours}</span>
              </div>
            </div>

            <div className="p-3 bg-[#E8F5FF] rounded-xl text-xs text-[#0757D9] leading-relaxed">
              By listing your business, you agree to Tizara’s merchant trust guidelines and fast customer response terms.
            </div>
          </div>
        )}

        {/* Navigation CTAs */}
        <div className="flex items-center gap-3 mt-5">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-3 rounded-2xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#172033] shadow-xs active:scale-95 transition-transform"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 h-13 rounded-2xl bg-tizara-gradient text-white font-brand font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0757D9]/25 active:scale-[0.98] transition-transform"
          >
            <span>{step === 4 ? 'Submit & Publish Listing' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </main>
    </div>
  );
};
