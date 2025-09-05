import React from 'react';
import { motion } from 'framer-motion';

export const ReviewMarquee = () => {
  // Sample images - replace with your actual image URLs
  const images = [
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945980/DSC06066_fjkkbr.webp",
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945978/image2_hvtr9u.webp",
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945972/DSC06065_oy5yke.webp",
 "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945968/DSC06062_tidu1s.webp" ,
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945750/DSC05913_pbk8zg.webp" ,
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945927/DSC06039_shmwqo.webp" ,
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945915/DSC06032_ygu0ot.webp" ,
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945791/DSC05953_txzd2h.webp" ,
   "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945878/DSC06011_hvmswk.webp" ,
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945897/DSC06023_je5zte.webp" ,
    "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945820/DSC05975_ap5fjh.webp" ,
   "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945814/DSC05968_gerdgk.webp" ,
   "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945794/DSC05955_blgewh.webp" ,
   "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945873/DSC05996_ixjbi6.webp" ,
   "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945770/DSC05930_xullbg.webp"
  ];


  //  { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945980/DSC06066_fjkkbr.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945978/image2_hvtr9u.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945972/DSC06065_oy5yke.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945968/DSC06062_tidu1s.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945750/DSC05913_pbk8zg.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945927/DSC06039_shmwqo.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945915/DSC06032_ygu0ot.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945791/DSC05953_txzd2h.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945878/DSC06011_hvmswk.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945897/DSC06023_je5zte.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945820/DSC05975_ap5fjh.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945814/DSC05968_gerdgk.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945794/DSC05955_blgewh.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945873/DSC05996_ixjbi6.webp" },
  //   { img: "https://res.cloudinary.com/drm13zjc5/image/upload/c_scale,w_400,q_auto,f_webp/v1756945770/DSC05930_xullbg.webp" },

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
