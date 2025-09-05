import React from 'react';
import { motion } from 'framer-motion';

export const ReviewMarquee = () => {
  // Sample images - replace with your actual image URLs
  const images = [
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
    'https://picsum.photos/200/300?random=4',
    'https://picsum.photos/200/300?random=5',
    'https://picsum.photos/200/300?random=6',
    'https://picsum.photos/200/300?random=7',
    'https://picsum.photos/200/300?random=8',
    'https://picsum.photos/200/300?random=9',
    'https://picsum.photos/200/300?random=10',
  ];

  // Calculate the width needed for one complete set of images
  const imageWidth = 192; // w-48 = 192px
  const gap = 24; // gap-6 = 24px
  const singleSetWidth = images.length * (imageWidth + gap);
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (

      <div className="relative w-full  h-[70vh]   overflow-hidden">
        {/* First row - left to right */}
        <motion.div
          className="flex absolute top-0 gap-6"
          animate={{
            x: [0, -singleSetWidth]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            width: 'max-content',
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-48 h-40 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image}
                alt={`Marquee ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* Second row - right to left (offset) */}
        <motion.div
          className="flex absolute top-44 gap-6"
          animate={{
            x: [-singleSetWidth, 0]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            width: 'max-content',
          }}
        >
          {duplicatedImages.slice().reverse().map((image, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-48 h-40 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image}
                alt={`Marquee reverse ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>






        {/* Third row - left to right (different speed) */}
        <motion.div
          className="flex absolute top-[350px] gap-6"
          animate={{
            x: [0, -singleSetWidth]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            width: 'max-content',
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`row3-${index}`}
              className="flex-shrink-0 w-48 h-40 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image}
                alt={`Marquee slow ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    
  );
};
