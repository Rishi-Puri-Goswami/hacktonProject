import React, { memo, useMemo } from 'react';

// Import your images (keeping the same imports)
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

// Optimized Hackathon Card with memo to prevent unnecessary re-renders
const HackathonCard = memo(({ img, index }) => {
  return (
    <div className="relative w-64 cursor-pointer overflow-hidden rounded-lg bg-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 flex-shrink-0">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          alt={`Team photo ${index}`}
          src={img}
          loading="lazy" // Lazy loading for better performance
          decoding="async" // Async decoding
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
});

HackathonCard.displayName = 'HackathonCard';

// Optimized Marquee Column component
const MarqueeColumn = memo(({ images, reverse = false, duration = 30 }) => {
  // Duplicate images for seamless loop - using fewer repetitions
  const duplicatedImages = useMemo(() => {
    const repeated = [];
    // Reduced from 8 to 4 repetitions to reduce DOM load
    for (let i = 0; i < 4; i++) {
      images.forEach((img, index) => {
        repeated.push({
          img,
          key: `${i}-${index}`,
          index: index
        });
      });
    }
    return repeated;
  }, [images]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div 
        className={`flex flex-col gap-4 ${reverse ? 'animate-marquee-up' : 'animate-marquee-down'}`}
        style={{ 
          '--duration': `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform' // Optimize for animations
        }}
      >
        {duplicatedImages.map(({ img, key, index }) => (
          <HackathonCard 
            key={key}
            img={img}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

MarqueeColumn.displayName = 'MarqueeColumn';

// Main component
export default function Marquee3D() {
  // Memoize the image arrays to prevent recreation on every render
  const imageColumns = useMemo(() => {
    const reviews = [
      image5, image6, image7, image8, image9, image10, image11,
      image12, image14, image15, image16, image17, image18, image19,
      image20, image21, image22, image23, image24, image25, image26
    ];

    return [
      reviews.slice(0, 7),   // First column - 7 images
      reviews.slice(7, 14),  // Second column - 7 images  
      reviews.slice(14, 21)  // Third column - 7 images
    ];
  }, []);

  return (
    <>
      {/* Optimized CSS with GPU acceleration */}
      <style jsx>{`
        @keyframes marquee-down {
          0% { 
            transform: translate3d(0, 0, 0); 
          }
          100% { 
            transform: translate3d(0, -50%, 0); 
          }
        }

        @keyframes marquee-up {
          0% { 
            transform: translate3d(0, -50%, 0); 
          }
          100% { 
            transform: translate3d(0, 0, 0); 
          }
        }

        .animate-marquee-down {
          animation: marquee-down var(--duration, 20s) linear infinite;
        }

        .animate-marquee-up {
          animation: marquee-up var(--duration, 20s) linear infinite;
        }

        /* Enable hardware acceleration and optimize performance */
        .marquee-container {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform;
        }

        .marquee-container > * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>

      <div className="relative flex h-[100vh] -mr-16 w-[72vw] flex-row items-center justify-center gap-4 overflow-hidden">
        <div
          className="flex pl-64 flex-row items-center gap-6 marquee-container"
          style={{
            transform: "translate3d(-100px, 0px, -100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <MarqueeColumn 
            images={imageColumns[0]} 
            duration={35}
          />
          
          <MarqueeColumn 
            images={imageColumns[1]} 
            reverse={true}
            duration={40} // Slightly different duration for visual variety
          />
          
          <MarqueeColumn 
            images={imageColumns[2]} 
            duration={37}
          />
        </div>
      </div>
    </>
  );
}