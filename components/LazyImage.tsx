import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, fallback to loading immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        // Start loading when the image is within 250px of the viewport
        rootMargin: '250px 0px',
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [isInView, src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Premium Shimmer Skeleton Loader */}
      <div
        className={`absolute inset-0 bg-gray-200/80 dark:bg-white/5 transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-full h-full animate-pulse bg-gradient-to-r from-transparent via-gray-300/30 dark:via-white/10 to-transparent" />
      </div>

      {/* Main Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale hover:grayscale-0 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
