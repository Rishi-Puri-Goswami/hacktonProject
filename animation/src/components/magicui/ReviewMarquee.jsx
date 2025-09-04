import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Marquee3D from "./Marquee3D";

// Simple and efficient window dimensions hook
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return windowDimensions;
};

// Lightweight image preloader (runs in background without blocking)
const useBackgroundImagePreload = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    // Don't block initial render - preload in background
    const timer = setTimeout(() => {
      imageUrls.forEach(url => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, url]));
        };
        img.src = url;
      });
    }, 100); // Small delay to not interfere with initial render

    return () => clearTimeout(timer);
  }, [imageUrls]);

  return loadedImages;
};

// Optimized ReviewCard - renders immediately, loads images progressively
const ReviewCard = memo(({ img, name, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    setImageError(true);
    e.target.style.opacity = '0.5';
  }, []);

  return (
    <figure
      className={cn(
        "relative h-30 w-36 ml-3 cursor-pointer overflow-hidden rounded-xl border shadow-md transition-transform duration-300 hover:scale-105",
        "border-gray-950/[.1] bg-gray-100 dark:border-gray-50/[.1] dark:bg-gray-800"
      )}
    >
      <div className="h-full w-full relative">
        {/* Always render image immediately - no blocking */}
        <img
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            imageLoaded && !imageError ? "opacity-100" : "opacity-0"
          )}
          src={img}
          alt={name || `Team photo ${index + 1}`}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Subtle loading placeholder - doesn't block scrolling */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700" />
        )}
      </div>
    </figure>
  );
});

ReviewCard.displayName = 'ReviewCard';

// Simplified MarqueeRow - no blocking, immediate render
const MarqueeRow = memo(({ reviews, reverse = false, duration = "20s", className = "" }) => {
  return (
    <Marquee 
      reverse={reverse} 
      pauseOnHover 
      className={`${className} flex`}
      style={{ '--duration': duration }}
    >
      {reviews.map((review, index) => (
        <ReviewCard 
          key={`${reverse ? 'reverse' : 'normal'}-${index}`}
          img={review.img}
          name={review.name}
          index={index}
        />
      ))}
    </Marquee>
  );
});

MarqueeRow.displayName = 'MarqueeRow';

// Mobile Marquee - immediate render, no blocking
const MobileMarquee = memo(({ firstRow, secondRow, thirdRow, scrollProps }) => {
  return (
    <div
      {...scrollProps}
      className="relative flex w-full flex-col gap-3 mt-3 items-center justify-center overflow-hidden"
    >
      {/* Render immediately - no waiting for preload */}
      <MarqueeRow reviews={firstRow} duration="40s" />
      <MarqueeRow reviews={secondRow} reverse duration="40s" />
      <MarqueeRow reviews={thirdRow} duration="40s" />
      
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-gray-900" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-gray-900" />
    </div>
  );
});

MobileMarquee.displayName = 'MobileMarquee';

// Desktop 3D - immediate render, no blocking
const Desktop3D = memo(({ scrollProps }) => {
  return (
    <div {...scrollProps}>
      <Marquee3D />
    </div>
  );
});

Desktop3D.displayName = 'Desktop3D';

export function ReviewMarquee() {
  const { width } = useWindowDimensions();
  
  // Memoize reviews array
  const reviews = useMemo(() => [
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945980/DSC06066_fjkkbr.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945978/image2_hvtr9u.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945972/DSC06065_oy5yke.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945968/DSC06062_tidu1s.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945927/DSC06039_shmwqo.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945915/DSC06032_ygu0ot.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945791/DSC05953_txzd2h.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945878/DSC06011_hvmswk.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945897/DSC06023_je5zte.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945820/DSC05975_ap5fjh.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945814/DSC05968_gerdgk.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945794/DSC05955_blgewh.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945873/DSC05996_ixjbi6.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945770/DSC05930_xullbg.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945750/DSC05913_pbk8zg.webp" }
  ], []);

  // Background preloading (doesn't block render)
  const imageUrls = useMemo(() => reviews.map(review => review.img), [reviews]);
  useBackgroundImagePreload(imageUrls);

  // Memoize row splits
  const { firstRow, secondRow, thirdRow } = useMemo(() => {
    const third = Math.floor(reviews.length / 3);
    return {
      firstRow: reviews.slice(0, third),
      secondRow: reviews.slice(third, third * 2),
      thirdRow: reviews.slice(third * 2)
    };
  }, [reviews]);

  // Memoize scroll props - EXACT same logic as original
  const scrollProps = useMemo(() => {
    return width > 625 ? {
      'data-scroll': true,
      'data-scroll-speed': '-.9'
    } : {};
  }, [width]);

  // Memoize breakpoint check - EXACT same as original
  const isMobile = useMemo(() => width <= 908, [width]);

  // Immediate render - no conditional loading states
  return (
    <>
      {isMobile ? (
        <MobileMarquee 
          firstRow={firstRow}
          secondRow={secondRow}
          thirdRow={thirdRow}
          scrollProps={scrollProps}
        />
      ) : (
        <Desktop3D scrollProps={scrollProps} />
      )}
    </>
  );
}