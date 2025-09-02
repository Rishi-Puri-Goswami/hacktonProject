import React, { useEffect } from 'react'
import Name from './Name'
import GlowingBall from './GlowingBall'
import { motion, useMotionValue, useTransform } from "framer-motion";
import StarDemo from './RandomStars';
import image from "../assets/image.png"
import image2 from "../assets/image2.png"
import Rightball from './Rightball';
import image3 from "../assets/image3.png"
import image5 from "../assets/image5.png"
import HackathonSection from './HackathonSection';
import logo from "../assets/logo.png"
import Timer from "./Timer"

const Forntpage = () => {
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

  return (
    <div data-scroll data-scroll-speed="-.4" className='h-screen flex flex-col items-center justify-center w-full relative bg-[#0a0a0a] overflow-hidden'>
      <div className='absolute w-fit top-4 right-[40px] z-50 font-loadfont'>
        <Timer />
      </div>

      <div className="h-20 w-full absolute top-0 p-3 z-50 flex items-center">
        <div className="h-[10vh] w-[10vh] ml-7 sm:h-[8vh] sm:w-[8vh] xs:h-[6vh] xs:w-[6vh]">
          <img
            src={logo}
            alt="logo"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <Name />

      {/* Background Layer */}
      <div className='absolute h-screen w-full'>
        <img src={image5} className='h-full w-full object-fill object-center opacity-90' alt="" />
      </div>

      

      {/* Faded 4.0 Text */}
      <div className="absolute top-3 inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-white font-bold select-none"
          style={{
            fontSize: 'clamp(25rem, 40vw, 38rem)',
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontWeight: '600',
            textShadow: '0 0 40px rgba(200,200,200,0.3)',
            background: 'linear-gradient(45deg, rgba(220,220,220,0.7), rgba(180,180,180,0.8), rgba(160,160,160,0.75))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'contrast(1.2) brightness(0.9)',
            letterSpacing: '0.05em'
          }}
        >
          4.0
        </motion.div>
      </div> 
       <img src={image} className='absolute h-screen w-full object-top object-fill z-30 opacity-90' alt="" />
      <img src={image2} className='absolute h-screen w-full object-top z-30 opacity-80' alt="" /> 

      {/* Main Animation Section */}
      <div className="relative w-full h-screen flex items-center -bottom-[200px] justify-center overflow-hidden">

        {/* Left Glowing Ball */}
        <div className="absolute md:left-[390px] left-0 -bottom-[275px] transform -translate-x-[65px] z-20">
          <GlowingBall gradientColors="radial-gradient(circle, rgba(255,180,100,0.9) 0%, rgba(255,50,200,0.7) 50%, rgba(0,0,139,0.7) 80%)" />
        </div>

        {/* Right Glowing Ball */}
        <div className="absolute md:left-[390px] left-0 -bottom-[275px] transform translate-x-[65px] z-10">
          <GlowingBall gradientColors="radial-gradient(circle, rgba(100,200,255,0.9) 0%, rgba(50,150,255,0.7) 50%, rgba(0,0,139,0.7) 80%)" />
        </div>

        {/* Bigger Blue Div */}
        <motion.div
          initial={{ y: 150, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            x: bigX,
            y: bigY,
            background: "linear-gradient(180deg, rgba(20,4,49,0.95) 0%, rgba(10,2,30,0.85) 100%)",
            boxShadow: "0 -10px 40px rgba(20,4,49,0.6), inset 0 5px 30px rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.1)",
          }}
          className="md:h-[66vh] md:w-[65vw] w-[10vw] absolute bottom-0 rounded-t-full z-40 backdrop-blur-lg"
        />
        

        {/* Smaller Blue Div */}
        <motion.div
          initial={{ y: 180, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            x: smallX,
            y: smallY,
            background: "linear-gradient(180deg, rgba(30,10,80,0.8) 0%, rgba(15,5,40,0.7) 100%)",
            boxShadow: "0 -8px 30px rgba(30,10,80,0.5), inset 0 4px 20px rgba(255,255,255,0.1)",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
          className="h-[56vh] w-[55vw] absolute bottom-0 rounded-t-full z-40 backdrop-blur-lg"
        />

        {/* Shine overlay */}
        <motion.div
          style={{ x: smallX, y: smallY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="md:h-[56vh] md:w-[55vw] bottom-0 rounded-t-full z-50 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-t-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0) 70%)",
              boxShadow: "0 0 30px rgba(255,255,255,0.1), 0 0 60px rgba(255,255,255,0.05)",
              WebkitMask: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3))",
            }}
          />
        </motion.div>

        {/* Floating glowing balls above Blue Div */}
        <div className="absolute md:left-[400px] left-0 bottom-[300px] h-[100px] w-[100px] transform -translate-x-[65px] z-40">
          <Rightball gradientColors="radial-gradient(circle, rgba(255,180,100,0.9) 0%, rgba(255,50,200,0.7) 50%, rgba(0,0,139,0.7) 80%)" />
        </div>

        {/* Man Image */}
        <motion.div
          initial={{ y: 200, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ x: smallX, y: smallY }}
          className="md:h-[77vh] md:w-[30vw] z-50 absolute bottom-[180px]"
        >
          <img
            src={image3}
            className="h-full w-full object-cover object-center"
            alt="man"
          />
        </motion.div>

        {/* Right-side Glowing Ball */}
        <div className="absolute md:left-[190px] left-[5px] bottom-[300px] h-[100px] w-[100px] transform translate-x-[65px] z-30">
          <GlowingBall gradientColors="radial-gradient(circle, rgba(255,80,80,1) 0%, rgba(200,30,30,0.9) 50%, rgba(120,0,0,0.8) 80%)" />
        </div>

        {/* Random Stars */}
        {/* <div className="absolute inset-0 -bottom-50 z-40">
          <StarDemo />
        </div>
        <div className="absolute inset-0 z-0 -bottom-50">
          <StarDemo />
        </div> */}
      </div>

      {/* Hackathon Section */}
      <HackathonSection />

    </div>
  )
}

export default Forntpage ;
