import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaRegClock } from "react-icons/fa";

const HackathonSection = () => {
  const sectionRef = useRef(null);
  
  // Track scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Fixed transforms - better range mapping for smooth back-and-forth animation
  const leftXScroll = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -100, -200, -300]);
  const rightXScroll = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 100, 200, 300]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0]);

  // Alternative approach - using viewport-based transforms for better mobile experience
  const leftXViewport = useTransform(scrollYProgress, [0, 0.5, 1], [-300, 0, -300]);
  const rightXViewport = useTransform(scrollYProgress, [0, 0.5, 1], [300, 0, 300]);
  const opacityViewport = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={sectionRef}
      className="absolute   top-[200px]   flex items-center justify-between w-full z-50 overflow-hidden
                 h-[30vh] sm:h-[65vh] md:h-[50vh] px-4 sm:px-6 md:px-10"
    >
      {/* LEFT SIDE */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          x: leftXViewport, // Using viewport-based transform
          opacity: opacityViewport,
        }}
        className="flex h-full w-[50vw] sm:w-[35vw] md:w-[20vw] mt-4 sm:mt-2 p-2 sm:p-4"
      >
        <motion.div
          className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-2 sm:ml-6 md:ml-[95px]"
          animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaRegClock className="text-[24px] sm:text-[30px] md:text-[40px] text-red-500" />
          <div className="flex flex-col">
            <div className="text-[18px] sm:text-[24px] md:text-[30px] text-red-50 font-loadfont font-semibold leading-4">
              24 hour
            </div>
            <div className="text-[18px] sm:text-[24px] md:text-[30px] text-red-50 font-loadfont font-semibold">
              Hackathon
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          x: rightXViewport, // Using viewport-based transform
          opacity: opacityViewport,
        }}
        className="flex h-full w-[60vw] sm:w-[40vw]  md:w-[25vw] pt-2 sm:pt-3 md:pt-4 pr-4 sm:pr-8 md:mr-[60px]"
      >
        <motion.div
          className="flex items-center gap- sm:gap-3 md:gap-4"
          animate={{ scale: [1, 1.03, 1], y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col gap-1 justify-center leading-tight sm:leading-5 md:leading-6 p-1 sm:p-2 md:p-3">
            <div className="text-[14px] sm:text-[20px] md:text-[30px] font-semibold text-red-500">
              2025
            </div>
            <div className="text-[14px] sm:text-[20px] md:text-[30px] font-semibold text-red-500">
              October
            </div>
          </div>
          <div className="flex flex-col border-l-2 border-red-600 pl-2 sm:pl-3">
            <div className="text-[12px] sm:text-[16px] md:text-[20px] leading-4 sm:leading-6 md:leading-6
                            p-1 sm:p-2 md:p-2 text-white font-loadfont font-semibold
                            w-[140px] sm:w-[180px] md:w-[210px]">
              Global Innovation Community Technology
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HackathonSection;