import React, { memo, useMemo, useCallback } from 'react';

// Optimized classname utility
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Memoized function to repeat children with better performance
const repeatChildren = (children, times = 3) => {
  const repeated = [];
  for (let i = 0; i < times; i++) {
    repeated.push(...children.map((child, index) => 
      React.cloneElement(child, { key: `${child.key || index}-repeat-${i}` })
    ));
  }
  return repeated;
};

// Memoized Marquee component
const Marquee = memo(({ 
  children, 
  pauseOnHover = false, 
  vertical = false, 
  reverse = false, 
  className = '',
  repeat = 6,
  duration = 20,
  ...props 
}) => {
  const marqueeClass = useMemo(() => cn(
    'flex',
    vertical ? 'flex-col animate-marquee-vertical' : 'animate-marquee',
    reverse && (vertical ? 'animate-marquee-vertical-reverse' : 'animate-marquee-reverse'),
    pauseOnHover && 'hover:[animation-play-state:paused]',
    className
  ), [vertical, reverse, pauseOnHover, className]);

  const repeatedChildren = useMemo(() => 
    repeatChildren(children, repeat), 
    [children, repeat]
  );

  return (
    <div className={cn('overflow-hidden', vertical ? 'h-full' : 'w-full')} {...props}>
      <div className={marqueeClass} style={{ '--duration': `${duration}s` }}>
        {repeatedChildren}
      </div>
    </div>
  );
});

Marquee.displayName = 'Marquee';

// Static reviews data with Cloudinary URLs and unique IDs
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

// Pre-split rows outside component to avoid recalculation
const firstRow = reviews.slice(0, 4);
const secondRow = reviews.slice(4, 8);
const thirdRow = reviews.slice(8, 12);

// Memoized HackathonCard component with optimized Cloudinary image handling
const HackathonCard = memo(({ img, name, description, id }) => {
  // Optimized Cloudinary URL with automatic format and quality optimization
  const optimizedImageUrl = useMemo(() => {
    if (img.includes('cloudinary.com')) {
      // Insert auto format and quality parameters for better performance
      return img.replace('/upload/', '/upload/f_auto,q_auto,w_300,h_200,c_fill/');
    }
    return img;
  }, [img]);

  const handleImageError = useCallback((e) => {
    console.error(`Failed to load image: ${img}`);
    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
  }, [img]);

  const handleImageLoad = useCallback((e) => {
    e.target.style.opacity = '1';
  }, []);

  return (
    <div className="relative w-64 cursor-pointer overflow-hidden rounded-lg bg-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 flex-shrink-0">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: '0' }}
          alt={name || 'Hackathon image'} 
          src={optimizedImageUrl}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          decoding="async"
          // Add importance hint for above-the-fold images
          fetchpriority="auto"
        />
      </div>
    </div>
  );
});

HackathonCard.displayName = 'HackathonCard';

// CSS-in-JS styles moved to a constant with GPU acceleration
const marqueeStyles = `
  @keyframes marquee-vertical {
    0% { 
      transform: translateY(0); 
    }
    100% { 
      transform: translateY(-50%); 
    }
  }

  @keyframes marquee-vertical-reverse {
    0% { 
      transform: translateY(-50%); 
    }
    100% { 
      transform: translateY(0); 
    }
  }

  .animate-marquee-vertical {
    animation: marquee-vertical var(--duration, 20s) linear infinite;
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .animate-marquee-vertical-reverse {
    animation: marquee-vertical-reverse var(--duration, 20s) linear infinite;
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  [style*="perspective"] {
    perspective: 300px;
  }

  /* Optimize for high DPI displays */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .animate-marquee-vertical,
    .animate-marquee-vertical-reverse {
      transform: translate3d(0, 0, 0);
    }
  }
`;

// Main component with optimized rendering
export default function Marquee3D() {
  const containerTransform = useMemo(() => 
    "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
    []
  );

  const marqueeProps = useMemo(() => ({
    pauseOnHover: true,
    vertical: true,
    repeat: 8,
    duration: 30,
    className: "h-full"
  }), []);

  const renderMarquee = useCallback((projects, reverse = false, keyPrefix) => (
    <Marquee {...marqueeProps} reverse={reverse}>
      {projects.map((project, index) => (
        <HackathonCard 
          key={`${keyPrefix}-${project.id}-${index}`} 
          img={project.img}
          name={project.name}
          description={project.body}
          id={project.id}
        />
      ))}
    </Marquee>
  ), [marqueeProps]);

  return (
    <div className="relative flex h-[100vh] -mr-16 w-[72vw] flex-row items-center justify-center gap-4 overflow-hidden">
      <style jsx>{marqueeStyles}</style>

      <div
        className="flex pl-64 flex-row items-center gap-4"
        style={{ transform: containerTransform }}
      >
        {renderMarquee(firstRow, false, 'first')}
        {renderMarquee(secondRow, true, 'second')}
        {renderMarquee(thirdRow, false, 'third')}
      </div>
    </div>
  );
}