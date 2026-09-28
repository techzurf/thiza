import React, { useRef, useEffect } from 'react';
import { Category } from '../../types';
import { CategoryIcon } from './CategoryIcon';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick: (cat: Category) => void;
  size?: 'sm' | 'md';
  videoUrl?: string;
  imageUrl?: string;
  fontIconClass?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onClick,
  size = 'md',
  videoUrl,
  imageUrl,
  fontIconClass,
}) => {
  const isSmall = size === 'sm';
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeFontIcon = fontIconClass || category.fontIconClass;

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [videoUrl]);

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      aria-label={`Category ${category.name}`}
      className={`group flex flex-col items-center gap-1.5 focus:outline-none transition-transform active:scale-95 cursor-pointer ${
        isSmall ? 'min-w-[64px]' : 'min-w-[72px]'
      }`}
    >
      <div
        className={`rounded-2xl flex items-center justify-center transition-all overflow-hidden relative ${
          isSmall ? 'w-12 h-12' : 'w-14 h-14'
        } ${
          isSelected
            ? 'ring-2 ring-[#0757D9] shadow-md scale-105'
            : 'group-hover:shadow-sm'
        }`}
        style={{
          backgroundColor: isSelected ? '#0757D9' : category.bgColor,
        }}
      >
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-full object-cover block pointer-events-none rounded-2xl"
            style={{ objectFit: 'cover' }}
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-contain p-2 block pointer-events-none"
            style={{ objectFit: 'contain' }}
            loading="eager"
          />
        ) : activeFontIcon ? (
          <i
            className={`${activeFontIcon} ${isSmall ? 'text-[20px]' : 'text-[24px]'} inline-flex items-center justify-center transition-colors ${
              isSelected ? 'text-white' : ''
            }`}
            style={{
              fontSize: isSmall ? '20px' : '24px',
              color: isSelected ? '#FFFFFF' : category.color,
              lineHeight: 1,
            }}
          />
        ) : (
          <CategoryIcon
            name={category.iconName}
            className={`${isSmall ? 'w-5 h-5' : 'w-6 h-6'} transition-colors ${
              isSelected ? 'text-white' : ''
            }`}
            style={{
              color: isSelected ? '#FFFFFF' : category.color,
            }}
          />
        )}
      </div>

      <span
        className={`text-center font-semibold leading-tight line-clamp-1 transition-colors ${
          isSmall ? 'text-[11px]' : 'text-xs'
        } ${isSelected ? 'text-[#0757D9]' : 'text-[#172033]'}`}
      >
        {category.name}
      </span>
    </button>
  );
};

