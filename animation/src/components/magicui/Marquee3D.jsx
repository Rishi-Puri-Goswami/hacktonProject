import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Advanced Intersection Observer with priority loading
const useAdvancedIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState(new Map());
  const observers = useRef(new Map());
  
  const observe = useCallback((element, callback, priority = 'normal') => {
    if (!element) return;
    
    const observerOptions = {
      threshold: priority === 'high' ? 0.1 : 0.01,
      rootMargin: priority === 'high' ? '100px' : '50px',
      ...options
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      setEntries(prev => new Map(prev.set(element, entry)));
      callback(entry);
    }, observerOptions);
    
    observer.observe(element);
    observers.current.set(element, observer);
    
    return () => {
      observer.disconnect();
      observers.current.delete(element);
    };
  }, [options]);
  
  useEffect(() => {
    return () => {
      observers.current.forEach(observer => observer.disconnect());
      observers.current.clear();
    };
  }, []);
  
  return { observe, entries };
};

// Progressive image loading with priority queue
const useProgressiveImageLoader = (imageUrls, options = {}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const loadQueue = useRef([]);
  const activeLoads = useRef(0);
  const maxConcurrent = options.maxConcurrent || 3;
  
  const loadImage = useCallback((url, priority = 'normal') => {
    return new Promise((resolve) => {
      if (loadedImages.has(url) || loadingImages.has(url)) {
        resolve({ url, success: loadedImages.has(url) });
        return;
      }
      
      setLoadingImages(prev => new Set([...prev, url]));
      
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'lazy';
      
      const handleLoad = () => {
        setLoadedImages(prev => new Set([...prev, url]));
        setLoadingImages(prev => {
          const next = new Set(prev);
          next.delete(url);
          return next;
        });
        activeLoads.current--;
        processQueue();
        resolve({ url, success: true });
      };
      
      const handleError = () => {
        setFailedImages(prev => new Set([...prev, url]));
        setLoadingImages(prev => {
          const next = new Set(prev);
          next.delete(url);
          return next;
        });
        activeLoads.current--;
        processQueue();
        resolve({ url, success: false });
      };
      
      img.onload = handleLoad;
      img.onerror = handleError;
      img.src = url;
      activeLoads.current++;
    });
  }, [loadedImages, loadingImages]);
  
  const processQueue = useCallback(() => {
    while (loadQueue.current.length > 0 && activeLoads.current < maxConcurrent) {
      const { url, priority, resolve } = loadQueue.current.shift();
      loadImage(url, priority).then(resolve);
    }
  }, [loadImage, maxConcurrent]);
  
  const queueImageLoad = useCallback((url, priority = 'normal') => {
    return new Promise((resolve) => {
      if (activeLoads.current < maxConcurrent) {
        loadImage(url, priority).then(resolve);
      } else {
        loadQueue.current.push({ url, priority, resolve });
        // Sort by priority
        loadQueue.current.sort((a, b) => {
          const priorityOrder = { high: 0, normal: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      }
    });
  }, [loadImage, maxConcurrent]);
  
  // Preload first batch immediately
  useEffect(() => {
    const initialBatch = imageUrls.slice(0, 5);
    initialBatch.forEach((url, index) => {
      const priority = index < 3 ? 'high' : 'normal';
      queueImageLoad(url, priority);
    });
  }, [imageUrls, queueImageLoad]);
  
  return { 
    loadedImages, 
    loadingImages, 
    failedImages, 
    queueImageLoad 
  };
};

// Ultra-optimized lazy image component
const LazyImage = React.memo(({ src, alt, className, priority = 'normal' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();
  const { observe } = useAdvancedIntersectionObserver();
  
  useEffect(() => {
    if (!imgRef.current) return;
    
    const cleanup = observe(
      imgRef.current,
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      priority
    );
    
    return cleanup;
  }, [observe, priority]);
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);
  
  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {!isVisible && (
        <div className="w-full h-full bg-purple-600 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {isVisible && !hasError && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transition: 'opacity 0.3s ease-out',
            filter: isLoaded ? 'blur(0)' : 'blur(5px)'
          }}
        />
      )}
      
      {hasError && (
        <div className="w-full h-full bg-purple-800 flex items-center justify-center">
          <div className="text-white text-xs opacity-75">Failed to load</div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// Ultra-minimal card component with priority detection
const MinimalCard = React.memo(({ img, index }) => {
  const priority = index < 6 ? 'high' : index < 12 ? 'normal' : 'low';
  
  return (
    <div className="w-48 h-32 mb-3 rounded-lg overflow-hidden bg-purple-800 flex-shrink-0">
      <LazyImage 
        src={img} 
        alt={`Gallery image ${index + 1}`}
        className="w-full h-full"
        priority={priority}
      />
    </div>
  );
});

MinimalCard.displayName = 'MinimalCard';

// Pure CSS marquee column with performance optimizations
const CSSMarqueeColumn = React.memo(({ images, reverse = false, duration = 25 }) => {
  const doubledImages = useMemo(() => [...images, ...images], [images]);
  
  return (
    <div className="h-full overflow-hidden">
      <div 
        className={cn(
          "flex flex-col",
          reverse ? 'animate-marquee-up' : 'animate-marquee-down'
        )}
        style={{ 
          '--duration': `${duration}s`,
          height: `${doubledImages.length * 140}px`
        }}
      >
        {doubledImages.map((image, index) => (
          <MinimalCard 
            key={`${image.img}-${index}`} 
            img={image.img} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

CSSMarqueeColumn.displayName = 'CSSMarqueeColumn';

export default function UltraOptimizedMarquee3D() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [performanceMode, setPerformanceMode] = useState('normal');

  // Optimized image dataset with Cloudinary transformations
  const images = useMemo(() => [
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945980/DSC06066_fjkkbr.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945978/image2_hvtr9u.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945972/DSC06065_oy5yke.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945968/DSC06062_tidu1s.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945750/DSC05913_pbk8zg.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945927/DSC06039_shmwqo.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945915/DSC06032_ygu0ot.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945791/DSC05953_txzd2h.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945878/DSC06011_hvmswk.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945897/DSC06023_je5zte.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945820/DSC05975_ap5fjh.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945814/DSC05968_gerdgk.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945794/DSC05955_blgewh.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945873/DSC05996_ixjbi6.webp" },
    { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945770/DSC05930_xullbg.webp" },
  ], []);

  const imageUrls = useMemo(() => images.map(img => img.img), [images]);
  const { loadedImages, queueImageLoad } = useProgressiveImageLoader(imageUrls, {
    maxConcurrent: 4
  });

  // Split into 3 columns with fewer images each
  const [col1, col2, col3] = useMemo(() => [
    images.slice(0, 5),
    images.slice(5, 10), 
    images.slice(10, 15)
  ], [images]);

  // Performance monitoring
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && connection.effectiveType) {
        setPerformanceMode(connection.effectiveType === '4g' ? 'high' : 'low');
      }
    }
  }, []);

  // Initialize after a brief delay to ensure smooth mounting
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return null; // Don't render anything while loading - let HTML loading screen handle it
  }

  const durations = performanceMode === 'high' ? [18, 20, 22] : [25, 27, 29];

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
          backface-visibility: hidden;
        }

        .animate-marquee-up {
          animation: marquee-up var(--duration, 25s) linear infinite;
          will-change: transform;
          backface-visibility: hidden;
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

      <div className="marquee-3d-container flex absolute -top-20 h-screen gap-6 pl-32">
        <CSSMarqueeColumn images={col1} duration={durations[0]} />
        <CSSMarqueeColumn images={col2} reverse duration={durations[1]} />
        <CSSMarqueeColumn images={col3} duration={durations[2]} />
      </div>
      
      {/* Loading progress indicator */}
      {loadedImages.size < imageUrls.length && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
          Loading: {loadedImages.size}/{imageUrls.length}
        </div>
      )}
    </div>
  );
}