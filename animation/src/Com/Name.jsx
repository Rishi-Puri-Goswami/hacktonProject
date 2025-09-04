import React from "react";
import { motion } from "framer-motion";

const letters = ["C", "O", "D", "E", "F", "I", "E", "S", "T", "A"];

const letterVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: i * 0.1,
    },
  }),
  hover: {
    y: [-2, 2, -2],
    scale: 1.2,
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "mirror", 
      ease: "easeInOut" 
    },
  },
};

const Name = () => {
  return (
    <div className="relative  w-[63vw] sm:w-[70vw] md:w-[49vw] h-[10vh] sm:h-[18vh] md:h-[19vh] z-50 flex top-28 sm:top-16 md:top-20 justify-center items-center">
      
      {/* Animated border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full border-b-[2px]  sm:border-b-[3px] md:border-b-[4px]  border-red-800 border-t-0 border-x-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      />

      {/* Animated Letters */}
      <div className="flex h-[12vh] sm:h-[16vh] md:h-[20vh] z-40 text-[28px] sm:text-[50px] md:text-[100px] tracking-tighter font-bold font-loadfont text-white absolute left-0 w-full justify-center items-center">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={letterVariants}
            className="relative mx-[2px] sm:mx-[4px]"
          >
            {letter}
          </motion.div>
        ))}
      </div>

      {/* Gradient Heading */}
      <div
  className="flex absolute leading-tight tracking-tighter font-semibold justify-center font-loadfont 
    text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[104px]
    top-14 sm:top-24 md:top-32 lg:top-36 items-center 
    w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw]
    h-[12vh] sm:h-[16vh] md:h-[20vh] 
    z-50 bg-clip-text text-transparent 
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"
>
  HACKA
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
    THON
  </span>
  <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
    4.0
  </span>
</div>

    </div>
  );
};

export default Name;
