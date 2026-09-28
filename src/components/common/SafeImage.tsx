import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackGradient?: string;
  fallbackInitials?: string;
  fallbackIcon?: React.ReactNode;
  alt: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackGradient = 'linear-gradient(135deg, #071B52 0%, #0757D9 50%, #08D9F5 100%)',
  fallbackInitials,
  fallbackIcon,
  alt,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If no src or src is invalid or already failed
  if (!src || hasError) {
    return (
      <div
        className={`relative flex items-center justify-center text-white overflow-hidden ${className}`}
        style={{ background: fallbackGradient }}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-black/10" />
        {fallbackIcon ? (
          <div className="relative z-10">{fallbackIcon}</div>
        ) : fallbackInitials ? (
          <span className="relative z-10 font-brand font-extrabold text-lg text-white/90 drop-shadow">
            {fallbackInitials}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background placeholder while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: fallbackGradient }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
