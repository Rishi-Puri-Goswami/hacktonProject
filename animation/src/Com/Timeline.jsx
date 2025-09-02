import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

const Timeline = () => {
    const difference = 135;
    const [isFlickeringHorizontal, setIsFlickeringHorizontal] = useState(true);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    const mainDivRef = useRef(null);
    const timelineRef = useRef(null);

    const [brightness, setBrightness] = useState(1.3);
    const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
    const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll-based timeline height
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });
    
    const timelineHeight = useTransform(scrollYProgress, [0, 1], [100, 1000]);

    // Motion values for smooth cursor follow
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 300);
    const springX = useSpring(x, { stiffness: 50, damping: 20 });
    const springY = useSpring(y, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!mainDivRef.current) return;

            const rect = mainDivRef.current.getBoundingClientRect();
            const blobSize = 500;

            const clampedX = Math.min(
                Math.max(e.clientX - rect.left - blobSize / 2, 0),
                rect.width - blobSize
            );
            const clampedY = Math.min(
                Math.max(e.clientY - rect.top - blobSize / 2, 0),
                rect.height - blobSize
            );

            x.set(clampedX);
            y.set(clampedY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    useEffect(() => {
        const horizontalFlicker = setInterval(() => {
            setIsFlickeringHorizontal(false);
            setTimeout(() => setIsFlickeringHorizontal(true), 60);
            setTimeout(() => setIsFlickeringHorizontal(false), 120);
            setTimeout(() => setIsFlickeringHorizontal(true), 200);
        }, 1800);

        return () => clearInterval(horizontalFlicker);
    }, []);

    const timelineData = [
        { time: "7:30 AM", event: "Team Registration" },
        { time: "8:00 AM", event: "Opening Ceremony" },
        { time: "9:00 AM", event: "Hackathon Begins" },
        { time: "9:30 AM", event: "Mentor Sessions" },
        { time: "10:00 AM", event: "Coffee Break" },
        { time: "10:30 AM", event: "Workshop - AI/ML" },
        { time: "11:00 AM", event: "Networking Session" },
        { time: "11:30 AM", event: "Progress Check" },
    ];

    // Optimized star generation with fixed positions
    const generateStars = () => {
        const stars = [];
        const gridCols = 10;
        const gridRows = 8;
        
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                // Only create stars in certain grid positions to reduce total count
                if ((row + col) % 3 === 0) {
                    const top = (row / (gridRows - 1)) * 100;
                    const left = (col / (gridCols - 1)) * 100;
                    const sizeVariant = (row + col) % 3;
                    const size = sizeVariant === 0 ? 2 : sizeVariant === 1 ? 1.5 : 1;
                    const animationDelay = (row * gridCols + col) % 4;
                    
                    stars.push({
                        id: row * gridCols + col,
                        top,
                        left,
                        size,
                        delay: animationDelay,
                        duration: 3 + (animationDelay % 2)
                    });
                }
            }
        }
        return stars;
    };

    const stars = generateStars();

    return (
        <>
            <style>
                {`
                @keyframes pulse-slow {
                    0%, 100% { filter: brightness(100%); }
                    50% { filter: brightness(115%); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2.5s ease-in-out infinite;
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 20px 5px rgba(236, 72, 153, 0.4), 0 0 40px 10px rgba(59, 130, 246, 0.3); }
                    50% { box-shadow: 0 0 30px 8px rgba(236, 72, 153, 0.6), 0 0 60px 15px rgba(59, 130, 246, 0.5); }
                }

                .timeline-dot {
                    animation: glow-pulse 3s ease-in-out infinite;
                }

                .event-card {
                    backdrop-filter: blur(10px);
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .event-card:hover {
                    transform: translateX(10px) scale(1.02);
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.4);
                }

                .title-text {
                    background: linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6, #06b6d4);
                    background-size: 400% 400%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-shift 4s ease-in-out infinite;
                }

                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                .time-badge {
                    background: linear-gradient(90deg, rgba(236, 72, 153, 0.8), rgba(59, 130, 246, 0.8));
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(5px);
                }
                `}
            </style>

            <div 
                {...(!isMobile && {
                    'data-scroll': true,
                    'data-scroll-speed': '-.8'
                })}
                ref={mainDivRef} 
                className='relative -z-10 pt-64 pb-64 overflow-hidden'
                style={{
                    background: 'linear-gradient(to bottom, #000000 0%, #101828 100%)'
                }}
            >
                {/* Optimized Stars Background */}
                <div className="absolute inset-0 z-[-2] overflow-hidden">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="absolute rounded-full bg-white"
                            style={{
                                top: `${star.top}%`,
                                left: `${star.left}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8)`,
                                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`
                            }}
                        />
                    ))}
                </div>

                {/* Enhanced Morphing Blob */}
                {typeof window !== 'undefined' && window.innerWidth > 770 && (
                    <motion.div
                        className="absolute w-[500px] h-[500px] opacity-30 rounded-full filter blur-[60px] z-0 mix-blend-screen"
                        style={{ 
                            x: springX, 
                            y: springY,
                            background: "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.8), rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.4))"
                        }}
                        animate={{
                            borderRadius: [
                                "90% 40% 30% 70% / 50% 60% 40% 50%",
                                "70% 30% 50% 50% / 30% 60% 70% 40%",
                                "80% 20% 60% 40% / 50% 30% 70% 50%",
                                "40% 60% 70% 30% / 10% 50% 30% 70%",
                                "55% 45% 15% 35% / 40% 70% 30% 60%",
                                "30% 70% 50% 50% / 70% 90% 60% 30%",
                                "75% 25% 35% 65% / 55% 65% 45% 35%",
                                "45% 55% 60% 40% / 65% 35% 55% 45%",
                            ]
                        }}
                        transition={{
                            duration: 12,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                    />
                )}

                {/* Enhanced Horizontal Glowing Line */}
                <div
                    className={`absolute z-40 top-0 h-[2px] w-full bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500
                        ${isFlickeringHorizontal ? 'opacity-90' : 'opacity-20'}
                        transition-opacity duration-100
                        shadow-[0_0_20px_8px_rgba(236,72,153,0.8),0_0_40px_15px_rgba(59,130,246,0.6)]
                        animate-pulse-slow`}
                >
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300 blur-sm opacity-60" />
                </div>

                {/* Enhanced Title */}
                <div className='bg-transparent font-bold text-center md:text-8xl text-5xl mb-20 sm:text-6xl relative z-10'>
                    <h1 className="title-text drop-shadow-2xl">
                        T I M E L I N E
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mt-4 rounded-full shadow-lg" />
                </div>

                {/* Enhanced Timeline Container */}
                <div ref={timelineRef} className="w-full h-fit flex text-white items-start relative z-10">
                    {/* Animated Vertical Line */}
                    <motion.div 
                        className="relative w-[3px] mx-7 sm:mx-14 md:mx-32 lg:mx-52 my-3 rounded-full"
                        style={{ 
                            height: timelineHeight,
                            background: "linear-gradient(to bottom, #ec4899, #3b82f6, #8b5cf6)",
                            boxShadow: "0 0 20px 4px rgba(236, 72, 153, 0.6), 0 0 40px 8px rgba(59, 130, 246, 0.4)"
                        }}
                    >
                        {/* Timeline Dots */}
                        {timelineData.map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute timeline-dot rounded-full w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] bg-gradient-to-br from-pink-400 to-blue-500"
                                style={{
                                    top: `${difference * i}px`,
                                    left: typeof window !== 'undefined' && window.innerWidth < 640 ? "-7px" : typeof window !== 'undefined' && window.innerWidth < 1024 ? "-9px" : "-11px",
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ 
                                    delay: i * 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 10
                                }}
                                whileHover={{ scale: 1.3 }}
                            />
                        ))}
                    </motion.div>

                    {/* Time Labels */}
                    <div className="relative h-[1000px] mx-[-3px] text-sm sm:text-base md:text-lg sm:mx-[-30px] md:mx-[-97px] lg:mx-[-170px]">
                        {timelineData.map((item, i) => (
                            <motion.div
                                key={i}
                                className="absolute time-badge rounded-full px-3 py-1 font-semibold text-white whitespace-nowrap"
                                style={{ 
                                    top: `${difference * i - 10}px`,
                                    left: "-10px"
                                }}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.15 }}
                            >
                                {item.time}
                            </motion.div>
                        ))}
                    </div>

                    {/* Enhanced Event Cards */}
                    <div className="absolute ml-5 h-[1000px] flex w-full">
                        {timelineData.map((item, i) => (
                            <motion.div
                                key={i}
                                className="absolute event-card rounded-xl border-[1px] border-opacity-30 cursor-pointer
                                    /* Mobile styles */
                                    left-[110px] w-[calc(100vw-140px)] max-w-[280px] px-3 py-3 text-sm
                                    /* Small mobile */
                                    xs:left-[70px] xs:w-[calc(100vw-150px)] xs:max-w-[300px] xs:px-4 xs:py-3 xs:text-sm
                                    /* Tablet */
                                    sm:left-[140px] sm:w-[320px] sm:max-w-none sm:px-5 sm:py-4 sm:text-base
                                    /* Medium screens */
                                    md:left-[240px] md:w-[380px] md:px-6 md:py-4 md:text-lg
                                    /* Large screens */
                                    lg:left-[330px] lg:w-[420px] lg:text-xl lg:px-6 lg:py-5
                                    font-medium text-white"
                                style={{ top: `${difference * i - 15}px` }}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ 
                                    delay: i * 0.2,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20
                                }}
                                whileHover={{ 
                                    scale: typeof window !== 'undefined' && window.innerWidth < 640 ? 1.01 : 1.02,
                                    x: typeof window !== 'undefined' && window.innerWidth < 640 ? 5 : 10,
                                }}
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl flex-shrink-0" 
                                          style={{ animation: `float 3s ease-in-out ${i * 0.5}s infinite` }}>
                                        {item.icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                                            {item.event}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-300 opacity-80 hidden sm:block">
                                            Click to learn more
                                        </div>
                                        <div className="text-xs text-gray-300 opacity-70 sm:hidden">
                                            Tap for details
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Responsive Decorative Corner */}
                                {/* <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-bl from-pink-500 to-transparent opacity-30 rounded-tr-xl sm:rounded-tr-2xl"  */}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Timeline;