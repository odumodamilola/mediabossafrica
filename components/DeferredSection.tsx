import React, { useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: number;
}

const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  className = '',
  rootMargin = '300px 0px',
  minHeight = 240,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = anchorRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={anchorRef} className={className} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? children : null}
    </div>
  );
};

export default DeferredSection;
