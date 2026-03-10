import { memo, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  blurred?: boolean;
}

export const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  blurred = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${blurred ? 'blur-2xl' : ''} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
});
