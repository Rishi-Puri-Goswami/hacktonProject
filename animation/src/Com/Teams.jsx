import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
import profilePho from '../assets/teams/teamimages.jpg'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'; // Install react-icons if not already: npm install react-icons

const Example = () => {
    return (
        <div className="w-full flex flex-col items-center place-content-center bg-gradient-to-br from-black to-blue-700/30 px-4 py-12 text-slate-900">
            <p className="mb-14 text-7xl font-loadFont font-bold text-white font-loadfont">
                OUR TEAM
            </p>

            <div className="bg-rd-300/50 flex flex-col items-center w-full justify-center">
                <p className="my-5 text-5xl font-loadFont font-bold text-white">
                    Conviers
                </p>
                <div className="flex justify-center items-center flex-wrap bg-gren-300/50 p-4 gap-14">
                    {/* <TiltCard /> */}
                    <TiltCard name={"Pradeep Jha"} />
                    <TiltCard name={"IC Sharma"} />
                </div>
            </div>

            <div className="bg-rd-300/50 flex flex-col items-center w-full justify-center mt-20">
                <p className="my-5 text-5xl font-loadFont font-bold text-white">
                    Developers
                </p>
                <div className="flex justify-center items-center flex-wrap bg-gren-300/50 p-4 gap-8">
                    <TiltCardDeveloper name={"Sahil vais"} />
                    <TiltCardDeveloper name={"Rishi Gosmami"} />
                    <TiltCardDeveloper name={"Mukul Jain"} />
                    <TiltCardDeveloper name={"Sachin gupta"} />
                </div>
            </div>

            <div className="bg-rd-300/50 flex flex-col items-center w-full justify-center mt-20">
                <p className="my-5 text-5xl font-loadFont font-bold text-white">
                    Organizers
                </p>
                <div className="flex justify-center items-center flex-wrap bg-gren-300/50 p-4 gap-8">
                    <TiltCardOrganizer />
                    <TiltCardOrganizer />
                    <TiltCardOrganizer />
                    <TiltCardOrganizer />
                </div>
            </div>

            <div className="bg-rd-300/50 flex flex-col items-center w-full justify-center mt-20">
                <p className="my-5 text-5xl font-loadFont font-bold text-white">
                    Cordinetors
                </p>
                <div className="flex justify-center items-center bg-green-300/50 p-4 gap-8 flex-wrap">
                    <TiltCardCordinetors />
                    <TiltCardCordinetors />
                    <TiltCardCordinetors />
                    <TiltCardCordinetors />
                </div>
            </div>


        </div>
    );
};

const SocialDock = () => {
    return (
        <div className="bg-white/30 w-fit backdrop-blur-md rounded-full shadow-lg px-6 py-3 flex items-center space-x-6">
            <a href="https://linkedin.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-125 transition-transform duration-300">
                <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-125 transition-transform duration-300">
                <FaTwitter size={24} />
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:scale-125 transition-transform duration-300">
                <FaGithub size={24} />
            </a>
            {/* Add more icons as needed */}
        </div>
    );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ name, photo }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 flex flex-col justify-start items-center place-content-center overflow-hidden rounded-xl bg-white shadow-lg"
            >
                {/* <FiMousePointer
                    style={{
                        // transform: "translateZ(75px)",
                    }}
                    className="mx-auto text-4xl"
                /> */}
                <div className="h-full w-full overflow-hidden  bg-green-300">
                    <img className="h-full w-full object-cover" src={profilePho} alt="" />
                </div>
                <p
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="absolute flex pb-2 flex-col items-center bg-gradient-to-b to-gray-500/50 from-white/0 text-white w-full h-fit bottom-0 text-center text-2xl font-bold mt-10"
                >
                    {name}
                    <SocialDock />

                </p>

            </div>
        </motion.div>
    );
};
const TiltCardDeveloper = ({ name, photo }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative  md:h-64 md:w-52 sm:h-64 sm:w-52 h-48 w-44 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 flex flex-col justify-start items-center place-content-center overflow-hidden rounded-xl bg-white shadow-lg"
            >
                {/* <FiMousePointer
                    style={{
                        // transform: "translateZ(75px)",
                    }}
                    className="mx-auto text-4xl"
                /> */}
                <div className="h-full w-full overflow-hidden  bg-green-300">
                    <img className="h-full w-full object-cover" src={profilePho} alt="" />
                </div>
                <p
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="absolute flex pb-2 flex-col items-center bg-gradient-to-b to-gray-500/50 from-white/0 text-white w-full h-fit bottom-0 text-center text-2xl font-bold mt-10"
                >
                    {name}
                    <SocialDock />

                </p>

            </div>
        </motion.div>
    );
};
const TiltCardOrganizer = ({ name, photo }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-72 w-56 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 flex flex-col justify-start items-center place-content-center overflow-hidden rounded-xl bg-white shadow-lg"
            >
                {/* <FiMousePointer
                    style={{
                        // transform: "translateZ(75px)",
                    }}
                    className="mx-auto text-4xl"
                /> */}
                <div className="h-full w-full overflow-hidden  bg-green-300">
                    <img className="h-full w-full object-cover" src={profilePho} alt="" />
                </div>
                <p
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="absolute flex pb-2 flex-col items-center bg-gradient-to-b to-gray-500/50 from-white/0 text-white w-full h-fit bottom-0 text-center text-2xl font-bold mt-10"
                >
                    {name}
                    <SocialDock />

                </p>

            </div>
        </motion.div>
    );
};
const TiltCardCordinetors = ({ name, photo }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return [0, 0];

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative  md:h-64 md:w-52 sm:h-64 sm:w-52 h-40 w-36 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 flex flex-col justify-start items-center place-content-center overflow-hidden rounded-xl bg-white shadow-lg"
            >
                {/* <FiMousePointer
                    style={{
                        // transform: "translateZ(75px)",
                    }}
                    className="mx-auto text-4xl"
                /> */}
                <div className="h-full w-full overflow-hidden  bg-green-300">
                    <img className="h-full w-full object-cover" src={profilePho} alt="" />
                </div>
                <p
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="absolute flex pb-2 flex-col items-center bg-gradient-to-b to-gray-500/50 from-white/0 text-white w-full h-fit bottom-0 text-center text-2xl font-bold mt-10"
                >
                    {name}
                    <SocialDock />

                </p>

            </div>
        </motion.div>
    );
};

export default Example;