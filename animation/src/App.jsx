import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Loading from "./Com/Loading";
import Forntpage from "./Com/Forntpage";
import LocomotiveScroll from 'locomotive-scroll';
import PrizesRewardsPage from "./Com/PrizesRewardsPage";
import Glimespage from "./Com/Glimespage";
import About from "./Com/About";

import Star from "./Com/Star";
import Teams from "./Com/Teams";
import Timeline from "./Com/TimeLine";

const App = () => {
  const [naveopen, setnaveopen] = useState(false)
  // Motion values for cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Bigger div moves opposite (anti-parallax)
  const bigX = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const bigY = useTransform(mouseY, [0, window.innerHeight], [10, -10]);

  // Smaller div moves with cursor (normal parallax)
  const smallX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  const smallY = useTransform(mouseY, [0, window.innerHeight], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const locomotiveScroll = new LocomotiveScroll();

  // Refs for sections
  const aboutRef = useRef(null);
  const themesRef = useRef(null);
  const timelineRef = useRef(null);
  const prizesRef = useRef(null);
  const mentorsRef = useRef(null);
  const teamRef = useRef(null);

  // Menu items with their corresponding refs
  const menuItems = [
    { name: "About", ref: aboutRef },
    { name: "Themes", ref: themesRef },
    { name: "Timeline", ref: timelineRef },
    { name: "Prizes", ref: prizesRef },
    { name: "Glimpse", ref: mentorsRef },
    { name: "Team", ref: teamRef },
  ];


  
  const scrollToRef = (ref) => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      animate(window.scrollY, top, {
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 1,
        onUpdate: (v) => window.scrollTo(0, v),
      });
    }
  };

  return (
    <>
      <div className="h-screen w-full relative flex-col flex">
        
        
        <div className="w-full h-screen bg-[#0a0a0a] items-center justify-center overflow-hidden">
          <Suspense fallback={<Loading />}>
            <Forntpage />
          </Suspense>
        </div>
      </div>

      <div className="relative w-full">
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={themesRef} className="star-section relative h-[200vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Star />
          </div>
        </div>
        <div ref={timelineRef}>
          <Timeline />
        </div>
        <div ref={prizesRef}>
          <PrizesRewardsPage />
        </div>
        <div ref={mentorsRef}>
          <Glimespage />
        </div>
        <div ref={teamRef}>
          <Teams />
        </div>
      </div>


      {/* Mobile Navbar - Hidden implementation for future use */}
     {window.innerWidth >= 1300 ? (
  // ---------- Medium and Large Screen Navbar ----------
  <div className="h-[50px] pr-2 w-fit   md:w-[60vw] bg-red overflow-hidden rounded-[30vh]
      backdrop-blur-xl bg-[#00000017]
      border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]
      fixed top-3 left-1/2 -translate-x-1/2
      z-[9999] pointer-events-auto flex items-center justify-between">
    



    {/* Menu Items */}
    <div className="h-full flex  justify-between px-2 p-1">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => scrollToRef(item.ref)}
          className="h-full flex items-center justify-center font-loadfont
            text-[12px] md:text-[14px] lg:text-[14px] font-semibold 
            w-20 md:w-24 lg:w-28 text-white rounded-[29px] cursor-pointer
            transition-all duration-300 ease-in-out
            hover:bg-gradient-to-r from-pink-500 to-[#6b4beb]
            hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,128,0.7)]"
        >
          
          {item.name}
        </div>
      ))}
    </div>
    
    {/* Register Now Button */}
    <div className="h-full -mr-1 w-[25vh] md:w-[28vh] lg:w-[30vh] py-1 flex items-center justify-center">
      <motion.div
        className="h-full w-full shrink-0 font-loadfont  rounded-[20px] font-semibold 
          text-[14px] md:text-[16px] lg:text-[17px]
          flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 
          text-white shadow-lg cursor-pointer"
        animate={{
          boxShadow: [
            "0 0 10px rgba(128,90,213,0.5)",
            "0 0 20px rgba(128,90,213,0.8)",
            "0 0 10px rgba(128,90,213,0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <a href="https://vision.hack2skill.com/event/codefiestahackathon4/?utm_source=hack2skill&utm_medium=homepage">
          Register Now
        </a>
      </motion.div>
    </div>

  </div>
) : (
  // ---------- Mobile Screen (Register Button Only) ----------
  <motion.div
    className="h-fit w-fit shrink-0 px-3 py-2 
    z-[9999]
    font-loadfont absolute top-2 right-2  
      rounded-[20px] font-semibold text-[15px] sm:text-[16px]
      flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 
      text-white shadow-lg cursor-pointer"
    animate={{
      boxShadow: [
        "0 0 10px rgba(128,90,213,0.5)",
        "0 0 20px rgba(128,90,213,0.8)",
        "0 0 10px rgba(128,90,213,0.5)",
      ],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  >
    <a href="https://vision.hack2skill.com/event/codefiestahackathon4/?utm_source=hack2skill&utm_medium=homepage">
      Register Now
    </a>
  </motion.div>
)}
    </>
  );
};

export default App;


// <div className="NAVBAR bg-ed-400/30 w-full py-2 mt-1 text-white flex justify-center items-center absolute top-0 left-0 z-50">
//           <div className="flex px-1 py-1 gap-4 border-[1px] rounded-full border-white/30 bg-white/10 backdrop-blur-md">
//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                 >
//                   Home
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>

//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => scrollToRef(themesRef)}
//                 >
//                   Theme
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>

//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => scrollToRef(timelineRef)}
//                 >
//                   Timeline
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>

//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => scrollToRef(prizesRef)}
//                 >
//                   Prize
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>

//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => scrollToRef(mentorsRef)}
//                 >
//                   Glimpse
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>

//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => scrollToRef(teamRef)}
//                 >
//                   Team
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>

//             <div className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 to-blue-600">
//               <div className="relative rounded-full overflow-hidden">
//                 <div
//                   style={{ userSelect: "none" }}
//                   className="bg-black/40 backdrop-blur-3xl px-7 py-1 rounded-full text-white cursor-pointer"
//                   onClick={() => scrollToRef(aboutRef)}
//                 >
//                   Contact
//                 </div>
//                 <div
//                   className="absolute inset-0 rounded-full 
//                            bg-gradient-to-r from-pink-400/50 to-blue-600/50 
//                            opacity-0 transition-opacity duration-300 ease-in-out
//                            hover:opacity-100"
//                 />
//               </div>
//             </div>
            
//             <a href="https://vision.hack2skill.com/event/codefiestahackathon4/?utm_source=hack2skill&utm_medium=homepage"
//                className="p-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-red-400 shadow shadow-yellow-300/20"
//                style={{ animation: "softpulse 2s ease-in-out infinite" }}>
//               <div style={{ userSelect: "none" }} 
//                    className="bg-gradient-to-r from-yellow-300/80 to-red-400/80 px-8 py-1 rounded-full font-bold text-black hover:scale-105 transition-transform duration-1000">
//                 REGISTER NOW
//               </div>
//             </a>

//             <style>{`
//               @keyframes softpulse {
//                 0%, 100% { opacity: 1; }
//                 50% { opacity: 0.75; } /* only slightly dim */
//               }
//             `}</style>
//           </div>
//         </div>