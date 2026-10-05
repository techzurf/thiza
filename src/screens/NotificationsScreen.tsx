import React, { useState, useMemo } from 'react';
import { ArrowLeft, Bell, Tag, MessageSquare, Sparkles, CheckCheck } from 'lucide-react';
import { AppNotification } from '../types';
import { EmptyState } from '../components/common/EmptyState';
import { useLanguage } from '../context/LanguageContext';

interface NotificationsScreenProps {
  notifications: AppNotification[];
  onBack: () => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: AppNotification) => void;
}

type NotifTab = 'all' | 'offer' | 'enquiry' | 'update';

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onBack,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [activeTab, setActiveTab] = useState<NotifTab>('all');
  const { t } = useLanguage();

  const tabs: { id: NotifTab; label: string }[] = useMemo(() => [
    { id: 'all', label: t('All') },
    { id: 'offer', label: t('Deals') },
    { id: 'enquiry', label: t('My Enquiries') },
    { id: 'update', label: t('Notifications') },
  ], [t]);

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'offer':
        return <Tag className="w-4 h-4 text-[#008CFF]" />;
      case 'enquiry':
        return <MessageSquare className="w-4 h-4 text-[#0757D9]" />;
      case 'update':
      default:
        return <Sparkles className="w-4 h-4 text-[#08D9F5]" />;
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
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
                {t('Notifications')}
              </h1>
              <p className="text-xs text-[#667085]">
                {t('Offers, status updates & news')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-[#0757D9] flex items-center gap-1 hover:text-[#008CFF] transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>{t('Mark all as read')}</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0757D9] text-white shadow-xs'
                    : 'bg-[#F5F8FC] text-[#667085] hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main List */}
      <main className="p-4 flex flex-col gap-3 max-w-lg mx-auto">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onNotificationClick(item)}
              onKeyDown={(e) => e.key === 'Enter' && onNotificationClick(item)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                item.isRead
                  ? 'bg-white border-[#E2E8F0] shadow-xs'
                  : 'bg-white border-[#0757D9]/30 shadow-sm ring-1 ring-[#0757D9]/10'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#172033] truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-[#667085] mt-1 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
              </div>

              {/* Unread blue dot */}
              {!item.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#008CFF] shrink-0 mt-1" />
              )}
            </div>
          ))
        ) : (
          <EmptyState
            icon={Bell}
            title={t('No Notifications')}
            description={t('You are all caught up!')}
            className="my-12 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs"
          />
        )}
      </main>
    </div>
  );
};
