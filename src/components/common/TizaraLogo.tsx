import React from 'react';

interface TizaraLogoProps {
  variant?: 'full' | 'mark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  className?: string;
}

export const TIZARA_LOGO_URL =
  'https://res.cloudinary.com/jevuqbu8/image/upload/v1791201433/Untitled_design_21.png';

export const TizaraLogo: React.FC<TizaraLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  showTagline = false,
  className = '',
}) => {
  // Dimensions based on size
  const markDimensions = {
    sm: { w: 28, h: 28 },
    md: { w: 36, h: 36 },
    lg: { w: 48, h: 48 },
    xl: { w: 72, h: 72 },
  }[size];

  const textSizes = {
    sm: 'text-lg font-bold tracking-tight',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-extrabold tracking-tight',
    xl: 'text-4xl font-extrabold tracking-tight',
  }[size];

  const taglineSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-wider',
    lg: 'text-xs tracking-wider',
    xl: 'text-sm tracking-widest',
  }[size];

  const textColor = theme === 'white' ? 'text-white' : 'text-[#071B52]';
  const taglineColor = theme === 'white' ? 'text-white/80' : 'text-[#667085]';

  // Render the new Tizara logo image with natural aspect ratio and container styling
  const renderMark = () => (
    <img
      src={TIZARA_LOGO_URL}
      alt="Tizara Logo"
      width={markDimensions.w}
      height={markDimensions.h}
      className="shrink-0 object-contain drop-shadow-sm select-none"
      style={{
        width: `${markDimensions.w}px`,
        height: `${markDimensions.h}px`,
        aspectRatio: '1/1',
      }}
      loading="eager"
    />
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderMark()}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {renderMark()}
      <div className="flex flex-col">
        <span className={`font-brand ${textSizes} ${textColor} leading-tight`}>
          Tizara
        </span>
        {showTagline && (
          <span className={`font-medium ${taglineSizes} ${taglineColor} tracking-wide`}>
            Discover • Connect • Grow
          </span>
        )}
      </div>
    </div>
  );
};
