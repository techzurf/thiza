import React from 'react';

interface TizaraLogoProps {
  variant?: 'full' | 'mark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  className?: string;
}

export const TizaraLogo: React.FC<TizaraLogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  showTagline = false,
  className = '',
}) => {
  // Dimensions based on size
  const markDimensions = {
    sm: { w: 26, h: 26 },
    md: { w: 34, h: 34 },
    lg: { w: 46, h: 46 },
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

  // SVG Monogram Mark: Dynamic 3D ribbon faceted geometric mark with Deep Navy -> Royal -> Electric -> Cyan gradient
  const renderMark = () => (
    <svg
      width={markDimensions.w}
      height={markDimensions.h}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm"
    >
      <defs>
        {/* Primary Tizara Gradient */}
        <linearGradient id="tizaraPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#071B52" />
          <stop offset="35%" stopColor="#0757D9" />
          <stop offset="70%" stopColor="#008CFF" />
          <stop offset="100%" stopColor="#08D9F5" />
        </linearGradient>

        {/* Secondary Cyan Glow Gradient */}
        <linearGradient id="tizaraCyanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#008CFF" />
          <stop offset="50%" stopColor="#08D9F5" />
          <stop offset="100%" stopColor="#00D9E8" />
        </linearGradient>

        {/* Deep Royal Shadow Facet */}
        <linearGradient id="tizaraDeepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#071B52" />
          <stop offset="100%" stopColor="#0757D9" />
        </linearGradient>
      </defs>

      {/* Modern geometric folding ribbon 'T' logo representation */}
      {/* Top horizontal cross-bar facet */}
      <path
        d="M18 20 C18 16.686 20.686 14 24 14 L76 14 C79.314 14 82 16.686 82 20 L76 36 C75 38 73 39 70 39 L30 39 C27 39 25 38 24 36 Z"
        fill="url(#tizaraCyanGrad)"
      />

      {/* Central vertical stem angled dynamic ribbon facet */}
      <path
        d="M38 34 L62 34 L54 84 C53.5 87 50.5 89 47 89 L39 89 C35.5 89 33 86.5 33.5 83 Z"
        fill="url(#tizaraPrimaryGrad)"
      />

      {/* Folded interconnecting facet giving the dimensional loop */}
      <path
        d="M50 36 L68 20 C71 18 75 19 77 22 L83 31 C85 34 84 38 81 40 L44 72 L36 58 Z"
        fill="url(#tizaraDeepGrad)"
        opacity="0.9"
      />

      {/* Electric cyan dynamic accent wing */}
      <path
        d="M20 28 L42 28 L34 50 L16 35 C14.5 33.5 15.5 30 18 29 Z"
        fill="url(#tizaraCyanGrad)"
        opacity="0.85"
      />

      {/* Central energy diamond core */}
      <circle cx="50" cy="46" r="4.5" fill="#FFFFFF" />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderMark()}</div>;
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
