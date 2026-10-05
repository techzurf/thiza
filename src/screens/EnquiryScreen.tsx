import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Send, Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Business } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface EnquiryScreenProps {
  business: Business;
  onBack: () => void;
  onDone: () => void;
}

export const EnquiryScreen: React.FC<EnquiryScreenProps> = ({
  business,
  onBack,
  onDone,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: 'Guest',
    phone: '+91 98401 98765',
    email: 'guest@example.com',
    message: language === 'Tamil' ? 'வணக்கம், உங்கள் வணிகம் குறித்த கூடுதல் விவரங்கள் தேவை.' : 'Hello, I am interested in your services and availability.',
    preferredDate: '2026-10-02',
    preferredTime: '11:00 AM',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="w-full min-h-[100dvh] bg-white flex flex-col justify-between p-6 select-none">
        <div className="pt-safe flex items-center justify-center">
          <span className="text-xs font-bold text-[#0757D9] uppercase tracking-wider">
            Tizara FastConnect
          </span>
        </div>

        <div className="my-auto flex flex-col items-center text-center max-w-sm mx-auto">
          <div className="w-20 h-20 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0757D9] mb-6 shadow-md shadow-[#0757D9]/10 animate-bounce duration-1000">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>

          <h2 className="font-brand font-extrabold text-2xl text-[#172033]">
            {t('Enquiry Sent Successfully!')}
          </h2>

          <p className="text-sm text-[#667085] mt-2 leading-relaxed">
            {t('The business owner will contact you shortly.')}
          </p>

          <div className="bg-[#F5F8FC] border border-[#E2E8F0] p-4 rounded-2xl w-full mt-6 text-left">
            <div className="text-xs text-[#667085] flex items-center justify-between pb-2 border-b border-slate-200">
              <span>{language === 'Tamil' ? 'பெறுநர்:' : 'Recipient:'}</span>
              <strong className="text-[#172033]">{business.name}</strong>
            </div>
            <div className="text-xs text-[#667085] flex items-center justify-between pt-2">
              <span>{language === 'Tamil' ? 'விருப்ப நேரம்:' : 'Preferred Date & Time:'}</span>
              <span className="text-[#0757D9] font-bold">
                {formData.preferredDate} at {formData.preferredTime}
              </span>
            </div>
          </div>
        </div>

        <div className="pb-safe max-w-sm mx-auto w-full">
          <button
            type="button"
            onClick={onDone}
            className="w-full h-13 rounded-2xl bg-tizara-gradient text-white font-brand font-bold text-base shadow-lg shadow-[#0757D9]/25 active:scale-[0.98] transition-transform cursor-pointer"
          >
            {t('Done')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label={t('Back')}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div>
            <h1 className="font-brand font-extrabold text-xl text-[#172033]">
              {t('Send Enquiry')}
            </h1>
            <p className="text-xs text-[#667085]">
              {business.name}
            </p>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="p-4 max-w-lg mx-auto">
        {/* Recipient summary card */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
            style={{ background: business.coverImage }}
          >
            {business.logo}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-[#172033] truncate">{business.name}</h3>
            <p className="text-xs text-[#667085] truncate">{business.categoryName} · {business.locality}</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0757D9]" />
              <span>{t('Your Name')} *</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0757D9]" />
              <span>{t('Phone Number')} *</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white transition-all"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0757D9]" />
              <span>{t('Email')}</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#0757D9]" />
              <span>{t('Your Message / Requirement')} *</span>
            </label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-sm font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Preferred Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0757D9]" />
                <span>{language === 'Tamil' ? 'தேதி' : 'Preferred Date'}</span>
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-xs font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0757D9]" />
                <span>{language === 'Tamil' ? 'நேரம்' : 'Preferred Time'}</span>
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-xs font-medium text-[#172033] outline-none focus:border-[#0757D9] focus:bg-white"
              >
                <option>09:00 AM - 12:00 PM</option>
                <option>12:00 PM - 03:00 PM</option>
                <option>03:00 PM - 06:00 PM</option>
                <option>06:00 PM - 09:00 PM</option>
              </select>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 rounded-2xl bg-tizara-gradient text-white font-brand font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0757D9]/25 hover:opacity-95 active:scale-[0.98] transition-all mt-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{t('Sending...')}</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t('Send Enquiry')}</span>
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};
