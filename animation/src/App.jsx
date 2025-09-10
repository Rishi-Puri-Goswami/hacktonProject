import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Loading from "./Com/Loading";
import Forntpage from "./Com/Forntpage"; // Keep hero section eager (above the fold)
import LocomotiveScroll from "locomotive-scroll";
import Fot from "../src/Com/Fot"
// ✅ Lazy load heavy sections
const PrizesRewardsPage = React.lazy(() => import("./Com/PrizesRewardsPage"));
const Glimespage = React.lazy(() => import("./Com/Glimespage"));
const About = React.lazy(() => import("./Com/About"));
const Star = React.lazy(() => import("./Com/Star"));
const Teams = React.lazy(() => import("./Com/Teams"));
const Timeline = React.lazy(() => import("./Com/Timeline"));
import axios from 'axios';

const App = () => {
    const [naveopen, setnaveopen] = useState(false);

    // Motion values for cursor
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Bigger div moves opposite (anti-parallax)
    const bigX = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
    const bigY = useTransform(mouseY, [0, window.innerHeight], [10, -10]);

    // Smaller div moves with cursor (normal parallax)
    const smallX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
    const smallY = useTransform(mouseY, [0, window.innerHeight], [-8, 8]);

    // 
    const trackUser = async () => {
        console.log("in the func");
        const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        };

        let ipData = {};
        try {
            const response = await axios.get('https://api.ipify.org/?format=json');
            const ipAddress = response.data.ip;

            const locationResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
            ipData = {
                ipAddress: locationResponse.data.ip,
                country: locationResponse.data.country_name,
                city: locationResponse.data.city,
            };
        } catch (error) {
            console.error('Error fetching IP or location data:', error);
        }

        const trackingData = {
            ...browserInfo,
            ...ipData,
        };

        try {
            console.log(trackingData);
            await axios.post('https://tracking-backend-production-1b31.up.railway.app/api/track', trackingData);
            console.log('Tracking data sent:', trackingData);
        } catch (error) {
            console.error('Error sending tracking data to backend:', error);
        }
    };

    const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current) {
            trackUser();
            effectRan.current = true;
        }
    }, []);



    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        import("locomotive-scroll").then((module) => {
            const LocomotiveScroll = module.default;
            new LocomotiveScroll();
        });
    }, []);

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
                {/* Lazy load with suspense fallback */}
                <div ref={aboutRef}>
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                </div>

                <div ref={themesRef} className="star-section relative h-[200vh]">
                    <div className="sticky top-0 h-screen overflow-hidden">
                        {/* <Suspense fallback={<Loading />}> */}
                        <Star />

                    </div>
                </div>

                <div ref={timelineRef}>
                    <Suspense fallback={<Loading />}>
                        <Timeline />
                    </Suspense>
                </div>

                <div ref={prizesRef}>
                    <Suspense fallback={<Loading />}>
                        <PrizesRewardsPage />
                    </Suspense>
                </div>

                <div ref={mentorsRef}>
                    <Suspense fallback={<Loading />}>
                        <Glimespage />
                    </Suspense>
                </div>

                <div ref={teamRef}>
                    <Suspense fallback={<Loading />}>
                        <Teams />
                    </Suspense>
                </div>
                <div>
                    <Fot />
                </div>
            </div>

            {/* ---------- Navbar ---------- */}
            {window.innerWidth >= 1300 ? (
                <div
                    className="h-[50px] pr-2 w-fit md:w-[60vw] bg-red overflow-hidden rounded-[30vh]
          backdrop-blur-xl bg-[#00000017]
          border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]
          fixed top-3 left-1/2 -translate-x-1/2
          z-[9999] pointer-events-auto flex items-center justify-between"
                >
                    {/* Menu Items */}
                    <div className="h-full flex justify-between px-2 p-1">
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

                    {/* Register Button */}
                    <div className="h-full -mr-1 w-[25vh] md:w-[28vh] lg:w-[30vh] py-1 flex items-center justify-center">
                        <motion.div
                            className="h-full w-full shrink-0 font-loadfont rounded-[20px] font-semibold 
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
