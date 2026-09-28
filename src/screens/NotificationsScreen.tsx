import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Tag,
  MessageSquare,
  Sparkles,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';
import { AppNotification } from '../types';
import { EmptyState } from '../components/common/EmptyState';

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

  const tabs: { id: NotifTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'offer', label: 'Offers' },
    { id: 'enquiry', label: 'Enquiries' },
    { id: 'update', label: 'Updates' },
  ];

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
              aria-label="Back"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div>
              <h1 className="font-brand font-extrabold text-xl text-[#172033]">
                Notifications
              </h1>
              <p className="text-xs text-[#667085]">
                Updates, offers & responses
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-[#0757D9] flex items-center gap-1 hover:text-[#008CFF] transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all read</span>
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
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
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 relative ${
                !item.isRead
                  ? 'bg-white border-[#008CFF]/30 shadow-xs'
                  : 'bg-white/80 border-[#E2E8F0]'
              }`}
            >
              {/* Type Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#E8F5FF] flex items-center justify-center shrink-0">
                {getIcon(item.type)}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className={`text-xs truncate ${!item.isRead ? 'font-bold text-[#071B52]' : 'font-semibold text-[#172033]'}`}>
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-[#667085] shrink-0 font-medium">
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
            title="No notifications yet"
            description="You are all caught up! New offers and responses will appear here."
            className="my-12 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs"
          />
        )}
      </main>
    </div>
  );
};
