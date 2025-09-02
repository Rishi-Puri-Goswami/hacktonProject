import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Loading from "./Com/Loading";
import Forntpage from "./Com/Forntpage";
import LocomotiveScroll from 'locomotive-scroll';
import PrizesRewardsPage from "./Com/PrizesRewardsPage";
import Glimespage from "./Com/Glimespage";
import About from "./Com/About";
import Timeline from "./Com/Timeline";
import Star from "./Com/Star";



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
    { name: "Mentors", ref: mentorsRef },
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

  return (<>

    <div className="h-screen   w-full      flex-col flex ">


      

<motion.div
            className="h-[40px] w-40   absolute top-5 right-3 z-[1000] font-loadfont rounded-[20px] font-semibold text-[17px]
                flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg cursor-pointer"
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
            Register Now
          </motion.div>

        
      <div className="  w-full h-screen  bg-[#0a0a0a]   items-center justify-center overflow-hidden">
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
      {/* <div ref={timelineRef}>
        <Timeline />
      </div> */}
      <div ref={prizesRef}>
        <PrizesRewardsPage />
      </div>
      <div ref={mentorsRef}>
        <Glimespage />
      </div>
      <div ref={teamRef}>
        {/* Add your Team component here */}
      </div>

    </div>


  </>
  );
};

export default App;






// {window.innerWidth <= 956 ? (
//         // ---------- Desktop Navbar ----------
//         <div className="h-[50px] pr-2 md:w-fit  bg-red  overflow-hidden rounded-[30vh]
//             backdrop-blur-xl bg-[#00000017]
//             border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]
//             fixed top-3 left-1/2 -translate-x-1/2
//             z-[9999] pointer-events-auto flex items-center justify-between">

        
//           <div 
          

//           className="h-full  flex      justify-between      px-2 p-1">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}

//                 onClick={() => scrollToRef(item.ref)}
                
//                 className="h-full bg flex items-center justify-center  font-loadfont
//                   text-[14px] font-semibold w-28 text-white rounded-[29px] cursor-pointer
//                   transition-all duration-300 ease-in-out
//                   hover:bg-gradient-to-r from-pink-500 to-[#6b4beb]
//                   hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,128,0.7)]"
//               >
//                 {item.name}
//               </div>
//             ))}
//           </div>

//           {/* Register Now Button */}
//           <div className="h-full   -mr-1    w-[30vh]   py-1  flex items-center justify-center">
//             <motion.div
//               className="h-full w-full   shrink-0 font-loadfont rounded-[20px] font-semibold text-[17px]
//                 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg cursor-pointer"
//               animate={{
//                 boxShadow: [
//                   "0 0 10px rgba(128,90,213,0.5)",
//                   "0 0 20px rgba(128,90,213,0.8)",
//                   "0 0 10px rgba(128,90,213,0.5)",
//                 ],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 ease: "easeInOut",
//               }}
//             >
//               Register Now
//             </motion.div>
//           </div>
//         </div>



//       ) :
//         (


          

//         )}