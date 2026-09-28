import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto ${className}`}>
      <div className="w-16 h-16 rounded-3xl bg-[#E8F5FF] flex items-center justify-center text-[#0757D9] mb-4 shadow-sm">
        <Icon className="w-8 h-8 stroke-[1.8]" />
      </div>

      <h3 className="font-brand font-bold text-lg text-[#172033]">
        {title}
      </h3>

      <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
        {description}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 px-6 py-2.5 rounded-xl bg-tizara-vibrant text-white font-bold text-xs shadow-md shadow-[#0757D9]/20 active:scale-95 transition-transform"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
