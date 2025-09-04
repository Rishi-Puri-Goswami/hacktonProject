import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Marquee3D from "./Marquee3D";

// Static reviews data with Cloudinary URLs - moved outside component to prevent recreation
const reviews = [
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945980/DSC06066_fjkkbr.webp",
    id: 'dsc06066'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945978/image2_hvtr9u.webp",
    id: 'image2'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945972/DSC06065_oy5yke.webp",
    id: 'dsc06065'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945968/DSC06062_tidu1s.webp",
    id: 'dsc06062'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945927/DSC06039_shmwqo.webp",
    id: 'dsc06039'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945915/DSC06032_ygu0ot.webp",
    id: 'dsc06032'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945791/DSC05953_txzd2h.webp",
    id: 'dsc05953'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945878/DSC06011_hvmswk.webp",
    id: 'dsc06011'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945897/DSC06023_je5zte.webp",
    id: 'dsc06023'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945820/DSC05975_ap5fjh.webp",
    id: 'dsc05975'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945814/DSC05968_gerdgk.webp",
    id: 'dsc05968'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945794/DSC05955_blgewh.webp",
    id: 'dsc05955'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945873/DSC05996_ixjbi6.webp",
    id: 'dsc05996'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945770/DSC05930_xullbg.webp",
    id: 'dsc05930'
  },
  { 
    img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945750/DSC05913_pbk8zg.webp",
    id: 'dsc05913'
  }
];

// Pre-calculate row splits outside component
const reviewRowSplits = (() => {
  const third = Math.floor(reviews.length / 3);
  return {
    firstRow: reviews.slice(0, third),
    secondRow: reviews.slice(third, third * 2),
    thirdRow: reviews.slice(third * 2)
  };
})();

// Breakpoint constants
const MOBILE_BREAKPOINT = 908;
const SCROLL_BREAKPOINT = 625;

// Optimized hook for window dimensions with better SSR handling
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;
    let rafId = null;

    const handleResize = () => {
      // Use requestAnimationFrame for better performance
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }, 150);
      });
    };

    // Initial measurement
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return windowDimensions;
};

// Optimized ReviewCard component with Cloudinary optimization
const ReviewCard = memo(({ img, name, index, id }) => {
  // Optimize Cloudinary URL for mobile cards
  const optimizedImageUrl = useMemo(() => {
    if (img.includes('cloudinary.com')) {
      // Add auto format, quality, and appropriate sizing for cards
      return img.replace('/upload/', '/upload/f_auto,q_auto,w_144,h_120,c_fill/');
    }
    return img;
  }, [img]);

  const cardClassName = useMemo(() => cn(
    "relative h-30 w-36 ml-3 cursor-pointer overflow-hidden rounded-xl border shadow-md transition-transform duration-300 hover:scale-105",
    "border-gray-950/[.1] bg-gray-100 dark:border-gray-50/[.1] dark:bg-gray-800"
  ), []);

  const handleImageError = useCallback((e) => {
    console.error(`Failed to load image: ${img}`);
    e.target.style.opacity = '0.5';
    e.target.src = 'https://via.placeholder.com/144x120?text=Image+Not+Found';
  }, [img]);

  const handleImageLoad = useCallback((e) => {
    e.target.style.opacity = '1';
  }, []);

  return (
    <figure className={cardClassName}>
      {/* Image section - now fills the complete frame */}
      <div className="h-full w-full">
        <img
          className="h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: '0' }}
          src={optimizedImageUrl}
          alt={name || `Team photo ${index}`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          onLoad={handleImageLoad}
          fetchpriority="auto"
        />
      </div>
    </figure>
  );
});

ReviewCard.displayName = 'ReviewCard';

// Memoized MarqueeRow component with better performance
const MarqueeRow = memo(({ reviews, reverse = false, duration = "20s", className = "" }) => {
  const marqueeStyle = useMemo(() => ({ '--duration': duration }), [duration]);
  
  const renderedReviews = useMemo(() => 
    reviews.map((review, index) => (
      <ReviewCard 
        key={`${review.id}-${reverse ? 'reverse' : 'normal'}-${index}`}
        img={review.img}
        name={review.name}
        index={index}
        id={review.id}
      />
    )), 
    [reviews, reverse]
  );

  return (
    <Marquee 
      reverse={reverse} 
      pauseOnHover 
      className={`${className} flex`}
      style={marqueeStyle}
    >
      {renderedReviews}
    </Marquee>
  );
});

MarqueeRow.displayName = 'MarqueeRow';

// Mobile Marquee Component with optimized gradient overlays
const MobileMarquee = memo(({ firstRow, secondRow, thirdRow, scrollProps }) => {
  const gradientOverlays = useMemo(() => (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </>
  ), []);

  return (
    <div
      {...scrollProps}
      className="relative flex w-full flex-col gap-3 mt-3 items-center justify-center overflow-hidden"
    >
      <MarqueeRow reviews={firstRow} duration="40s" />
      <MarqueeRow reviews={secondRow} reverse duration="40s" />
      <MarqueeRow reviews={thirdRow} duration="40s" />
      
      {/* Gradient overlays */}
      {gradientOverlays}
    </div>
  );
});

MobileMarquee.displayName = 'MobileMarquee';

// Desktop 3D Component wrapper
const Desktop3D = memo(({ scrollProps }) => {
  return (
    <div {...scrollProps}>
      <Marquee3D />
    </div>
  );
});

Desktop3D.displayName = 'Desktop3D';

// Main ReviewMarquee component with optimized rendering
export function ReviewMarquee() {
  const { width } = useWindowDimensions();
  
  // Memoize scroll props calculation
  const scrollProps = useMemo(() => {
    return width > SCROLL_BREAKPOINT ? {
      'data-scroll': true,
      'data-scroll-speed': '-.9'
    } : {};
  }, [width]);

  // Memoize the breakpoint check
  const isMobile = useMemo(() => width <= MOBILE_BREAKPOINT, [width]);

  // Memoize the component selection to prevent unnecessary re-renders
  const renderComponent = useMemo(() => {
    if (isMobile) {
      return (
        <MobileMarquee 
          firstRow={reviewRowSplits.firstRow}
          secondRow={reviewRowSplits.secondRow}
          thirdRow={reviewRowSplits.thirdRow}
          scrollProps={scrollProps}
        />
      );
    }
    
    return <Desktop3D scrollProps={scrollProps} />;
  }, [isMobile, scrollProps]);

  return renderComponent;
}