import React, { memo, useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Marquee3D from "./Marquee3D";

// Import images
import image5 from "../../assets/teams/DSC05945.jpg"
import image6 from "../../assets/teams/DSC05950.jpg"
import image7 from "../../assets/teams/DSC05953.jpg"
import image8 from "../../assets/teams/DSC05955.jpg"
import image9 from "../../assets/teams/DSC05976.jpg"
import image10 from "../../assets/teams/DSC05991.jpg"
import image11 from "../../assets/teams/DSC05996.jpg"
import image12 from "../../assets/teams/DSC06000.jpg"
import image14 from "../../assets/teams/DSC06032.jpg"
import image15 from "../../assets/teams/DSC05951.jpg"
import image16 from "../../assets/teams/DSC05954.jpg"
import image17 from "../../assets/teams/DSC05974.jpg"
import image18 from "../../assets/teams/DSC05971.jpg"
import image19 from "../../assets/teams/DSC05968.jpg"
import image20 from "../../assets/teams/DSC06061.jpg"
import image21 from "../../assets/teams/DSC06058.jpg"
import image22 from "../../assets/teams/DSC06052.jpg"
import image23 from "../../assets/teams/DSC06060.jpg"
import image24 from "../../assets/teams/DSC06078.jpg"
import image25 from "../../assets/teams/DSC06079.jpg"
import image26 from "../../assets/teams/DSC06101.jpg"

// Optimized hook for window dimensions
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;
    const handleResize = () => {
      // Debounce resize events for better performance
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

// Memoized ReviewCard component
const ReviewCard = memo(({ img, name, index }) => {
  return (
    <figure
      className={cn(
        "relative h-30 w-36 ml-3 cursor-pointer overflow-hidden rounded-xl border shadow-md transition-transform duration-300 hover:scale-105",
        "border-gray-950/[.1] bg-gray-100 dark:border-gray-50/[.1] dark:bg-gray-800"
      )}
    >
      {/* Image section - now fills the complete frame */}
      <div className="h-full w-full">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt={name || `Team photo ${index}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.style.opacity = '0.5';
          }}
        />
      </div>
    </figure>
  );
});

ReviewCard.displayName = 'ReviewCard';

// Memoized MarqueeRow component
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

// Mobile Marquee Component
const MobileMarquee = memo(({ firstRow, secondRow, scrollProps }) => {
  return (
    <div
      {...scrollProps}
      className="relative flex w-full flex-col gap-3 mt-3 items-center justify-center overflow-hidden"
    >
      <MarqueeRow reviews={firstRow} duration="40s" />
      <MarqueeRow reviews={secondRow} reverse duration="40s" />
      <MarqueeRow reviews={secondRow} reverse duration="40s" />
      
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
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

export function ReviewMarquee() {
  const { width } = useWindowDimensions();
  
  // Memoize reviews array to prevent recreation on every render
  const reviews = useMemo(() => [
    { img: image5 },
    { img: image6 },
    { img: image7 },
    { img: image8 },
    { img: image9 },
    { img: image10 },
    { img: image11 },
    { img: image12 },
    { img: image14 },
    { img: image15 },
    { img: image16 },
    { img: image17 },
    { img: image18 },
    { img: image19 },
    { img: image20 },
    { img: image21 },
    { img: image22 },
    { img: image23 },
    { img: image24 },
    { img: image25 },
    { img: image26 }
  ], []);

  // Memoize row splits
  const { firstRow, secondRow } = useMemo(() => {
    const midpoint = Math.floor(reviews.length / 2);
    return {
      firstRow: reviews.slice(0, midpoint),
      secondRow: reviews.slice(midpoint)
    };
  }, [reviews]);

  // Memoize scroll props
  const scrollProps = useMemo(() => {
    return width > 625 ? {
      'data-scroll': true,
      'data-scroll-speed': '-.9'
    } : {};
  }, [width]);

  // Memoize the breakpoint check
  const isMobile = useMemo(() => width <= 908, [width]);

  return (
    <>
      {isMobile ? (
        <MobileMarquee 
          firstRow={firstRow}
          secondRow={secondRow}
          scrollProps={scrollProps}
        />
      ) : (
        <Desktop3D scrollProps={scrollProps} />
      )}
    </>
  );
}