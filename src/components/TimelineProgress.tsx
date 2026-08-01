'use client';

import { useEffect, useRef } from 'react';

interface TimelineProgressProps {
  children: React.ReactNode;
}

export default function TimelineProgress({ children }: TimelineProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const lineFill = lineFillRef.current;
    if (!container || !lineFill) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerHeight = rect.height;

      // Calculate how much of the timeline has been scrolled past
      const scrolledFromTop = windowHeight / 2 - containerTop;
      const progress = Math.max(0, Math.min(100, (scrolledFromTop / containerHeight) * 100));

      lineFill.style.height = `${progress}%`;

      // Calculate where the white line actually is (top of the fill)
      const lineTopPosition = containerTop + (containerHeight * (progress / 100));

      // Add/remove active class on items based on line position
      const items = container.querySelectorAll('.timeline-item');
      items.forEach((item) => {
        // Get the dot's position (32px from top of item)
        const itemRect = item.getBoundingClientRect();
        const dotPosition = itemRect.top + 32;

        // Only glow when the white line has reached or passed the dot
        if (lineTopPosition >= dotPosition) {
          item.classList.add('timeline-item--glow');
        } else {
          item.classList.remove('timeline-item--glow');
        }
      });
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="timeline" ref={containerRef}>
      {/* Vertical line with fill */}
      <div className="timeline__line-bg"></div>
      <div className="timeline__line-fill" ref={lineFillRef}></div>
      {children}
    </div>
  );
}
