import React, { useState, useEffect, useMemo, useRef } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Ultra-lightweight image preloader - only loads visible images
const useProgressiveImageLoader = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [currentBatch, setCurrentBatch] = useState(0);
  const batchSize = 5; // Load only 5 images at a time

  useEffect(() => {
    const loadBatch = async (batchIndex) => {
      const startIndex = batchIndex * batchSize;
      const batch = imageUrls.slice(startIndex, startIndex + batchSize);
      
      const loadPromises = batch.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, url]));
            resolve();
          };
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = url;
        });
      });

      await Promise.all(loadPromises);
      
      // Load next batch after a short delay
      if (startIndex + batchSize < imageUrls.length) {
        setTimeout(() => setCurrentBatch(prev => prev + 1), 300);
      }
    };

    loadBatch(currentBatch);
  }, [imageUrls, currentBatch, batchSize]);

  return { loadedImages };
};

// Ultra-optimized image component with intersection observer
const LazyImage = React.memo(({ src, alt, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isVisible ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      ) : (
        <div className="w-full h-full bg-purple-600 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// Ultra-minimal card component
const MinimalCard = React.memo(({ img }) => (
  <div className="w-48 h-32 mb-3 rounded-lg overflow-hidden bg-purple-800 flex-shrink-0">
    <LazyImage 
      src={img} 
      alt="Gallery image"
      className="w-full h-full"
    />
  </div>
));

MinimalCard.displayName = 'MinimalCard';

// Pure CSS marquee column
const CSSMarqueeColumn = ({ images, reverse = false, duration = 25 }) => {
  // Only repeat twice for seamless effect
  const doubledImages = [...images, ...images];
  
  return (
    <div className="h-full overflow-hidden">
      <div 
        className={`flex flex-col ${reverse ? 'animate-marquee-up' : 'animate-marquee-down'}`}
        style={{ 
          '--duration': `${duration}s`,
          height: `${doubledImages.length * 140}px` // Fixed height calculation
        }}
      >
        {doubledImages.map((image, index) => (
          <MinimalCard key={`${image.img}-${index}`} img={image.img} />
        ))}
      </div>
    </div>
  );
};

export default function UltraOptimizedMarquee3D() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Reduced image set for better performance
  const images = useMemo(() => [
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945980/DSC06066_fjkkbr.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945978/image2_hvtr9u.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945972/DSC06065_oy5yke.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945968/DSC06062_tidu1s.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945750/DSC05913_pbk8zg.webp" },
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
  ], []);


  
  const imageUrls = useMemo(() => images.map(img => img.img), [images]);
  const { loadedImages } = useProgressiveImageLoader(imageUrls);

  // Split into 3 columns with fewer images each
  const [col1, col2, col3] = useMemo(() => [
    images.slice(0, 5),
    images.slice(5, 10), 
    images.slice(10, 15)
  ], [images]);

  // Initialize after a brief delay to ensure smooth mounting
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="relative flex h-screen w-screen items-center justify-center">
        <div className="text-white text-lg">Initializing...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[100vh] -mr-16 w-[72vw] items-center justify-center overflow-hidden">
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
          animation: marquee-down var(--duration, 25s) linear infinite;
          will-change: transform;
        }

        .animate-marquee-up {
          animation: marquee-up var(--duration, 25s) linear infinite;
          will-change: transform;
        }

        /* Single optimized 3D container */
        .marquee-3d-container {
          transform: perspective(800px) 
                     translate3d(-50px, 0, -50px) 
                     rotateX(15deg) 
                     rotateY(-8deg) 
                     rotateZ(15deg);
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-down,
          .animate-marquee-up {
            animation-duration: 60s;
          }
        }
      `}</style>

      <div className="marquee-3d-container flex  absolute -top-20  h-screen  gap-6 pl-32">
        <CSSMarqueeColumn images={col1} duration={20} />
        <CSSMarqueeColumn images={col2} reverse duration={22} />
        <CSSMarqueeColumn images={col3} duration={24} />
      </div>
    </div>
  );
}