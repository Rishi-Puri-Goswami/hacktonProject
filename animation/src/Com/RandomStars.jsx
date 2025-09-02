import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const generateStars = (count, distanceMin, distanceMax, sizeMin, sizeMax) => {
  const colors = [
    'rgba(255, 255, 255, 0.9)', // bright white
    'rgba(173, 216, 230, 0.8)', // light blue
    'rgba(255, 182, 193, 0.7)', // light pink
    'rgba(144, 238, 144, 0.6)', // light green
    'rgba(255, 255, 224, 0.8)', // light yellow
    'rgba(221, 160, 221, 0.7)', // plum
  ];

  return Array.from({ length: count }).map(() => ({
    angle: Math.random() * 2 * Math.PI,
    distance: distanceMin + Math.random() * (distanceMax - distanceMin),
    size: sizeMin + Math.random() * (sizeMax - sizeMin),
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 8,
    sineFrequency: 0.3 + Math.random() * 1.2,
    sineAmplitude: 30 + Math.random() * 60,
    twinkleSpeed: 3 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.4,
    starType: Math.random() > 0.7 ? 'cross' : 'diamond', // mix of star shapes
  }));
};

const ClassySineStars = ({
  count = 80,
  distanceMin = 100,
  distanceMax = 400,
  sizeMin = 1,
  sizeMax = 4,
  dimMode = true
}) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(count, distanceMin, distanceMax, sizeMin, sizeMax));
  }, [count, distanceMin, distanceMax, sizeMin, sizeMax]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${s.size * 3}px`,
              height: `${s.size * 3}px`,
              left: '50%',
              bottom: '0px', // Start from bottom
              transform: 'translateX(-50%)',
            }}
            animate={{
              x: [
                0,
                (Math.cos(s.angle) * s.distance * 0.4 + Math.sin(0 * s.sineFrequency) * s.sineAmplitude * 0.3) * (window.innerWidth / 800),
                (Math.cos(s.angle) * s.distance * 0.8 + Math.sin(Math.PI * s.sineFrequency) * s.sineAmplitude * 0.7) * (window.innerWidth / 800),
                (Math.cos(s.angle) * s.distance + Math.sin(2 * Math.PI * s.sineFrequency) * s.sineAmplitude) * (window.innerWidth / 800),
              ],
              y: [
                0, // Start at bottom
                -(Math.abs(Math.sin(s.angle)) * s.distance * 0.4 + Math.cos(0 * s.sineFrequency) * s.sineAmplitude * 0.3) * (window.innerHeight / 600),
                -(Math.abs(Math.sin(s.angle)) * s.distance * 0.8 + Math.cos(Math.PI * s.sineFrequency) * s.sineAmplitude * 0.7) * (window.innerHeight / 600),
                -(Math.abs(Math.sin(s.angle)) * s.distance + Math.cos(2 * Math.PI * s.sineFrequency) * s.sineAmplitude) * (window.innerHeight / 600),
              ],
              opacity: [0, s.opacity * 0.6, s.opacity, 0],
              scale: [0.3, 1.1, 0.9, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.25, 0.75, 1],
            }}
          >
            {/* Star Shape */}
            {s.starType === 'cross' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  className="absolute"
                  style={{
                    width: `${s.size}px`,
                    height: `${s.size * 4}px`,
                    background: `linear-gradient(to bottom, transparent 0%, ${s.color} 20%, ${s.color} 80%, transparent 100%)`,
                    borderRadius: '50px',
                    filter: `drop-shadow(0 0 ${s.size * 2}px ${s.color}) blur(0.5px)`,
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: s.twinkleSpeed,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: `${s.size * 4}px`,
                    height: `${s.size}px`,
                    background: `linear-gradient(to right, transparent 0%, ${s.color} 20%, ${s.color} 80%, transparent 100%)`,
                    borderRadius: '50px',
                    filter: `drop-shadow(0 0 ${s.size * 2}px ${s.color}) blur(0.5px)`,
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: s.twinkleSpeed,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  className="absolute"
                  style={{
                    width: `${s.size * 2}px`,
                    height: `${s.size * 2}px`,
                    background: s.color,
                    borderRadius: '0',
                    transform: 'rotate(45deg)',
                    filter: `drop-shadow(0 0 ${s.size * 3}px ${s.color}) blur(0.3px)`,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: s.twinkleSpeed * 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: `${s.size * 4}px`,
                    height: `${s.size * 4}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${s.color}20 0%, transparent 70%)`,
                    filter: 'blur(2px)',
                  }}
                  animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.5, 1.5, 0.5] }}
                  transition={{
                    duration: s.twinkleSpeed * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const StarDemo = () => {
  const [dimMode, setDimMode] = useState(true);

  return (
    <div className="relative w-full   bg-transparent overflow-hidden">
    <ClassySineStars dimMode={dimMode} count={100} distanceMin={400} distanceMax={300} sizeMin={2} sizeMax={4} />




    </div>
  );
};

export default StarDemo;
