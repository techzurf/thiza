import React from 'react';
import { Search, Mic, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch?: () => void;
  onFilterClick?: () => void;
  onVoiceClick?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  isReadOnly?: boolean;
  onFocus?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onFilterClick,
  onVoiceClick,
  placeholder,
  autoFocus = false,
  isReadOnly = false,
  onFocus,
}) => {
  const { t } = useLanguage();
  const defaultPlaceholder = t('Search businesses, services...');
  const displayPlaceholder = placeholder ? t(placeholder) : defaultPlaceholder;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full gap-2">
      <div className="relative flex-1 flex items-center bg-white rounded-2xl border border-[#E2E8F0] shadow-sm px-3.5 py-2.5 focus-within:border-[#0757D9] focus-within:ring-2 focus-within:ring-[#0757D9]/10 transition-all">
        <Search className="w-5 h-5 text-[#0757D9] shrink-0 stroke-[2.2]" />
        
        <input
          type="text"
          value={value}
          readOnly={isReadOnly}
          onFocus={onFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={displayPlaceholder}
          autoFocus={autoFocus}
          className="w-full bg-transparent px-3 text-sm font-medium text-[#172033] placeholder-[#667085] outline-none"
        />

        {value && !isReadOnly && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="p-1 rounded-full hover:bg-slate-100 text-[#667085] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onVoiceClick}
          aria-label="Voice search"
          className="p-1 rounded-full text-[#667085] hover:text-[#0757D9] transition-colors shrink-0"
        >
          <Mic className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Filter results"
          className="w-11 h-11 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#172033] hover:border-[#0757D9] hover:text-[#0757D9] active:scale-95 transition-all shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
        </button>
      )}
    </form>
  );
};
