import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { FaOtter } from 'react-icons/fa6';
import x from '../assets/x.svg';

const Fot = ({ targetDate = "2025-09-10T00:00:00" }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const calculateTimeLeft = () => {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };

    useEffect(() => {
        // Calculate initial time
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            // Stop timer when countdown reaches zero
            if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    };

    return (
        <footer className="bg-gradient-to-t to-[#2b3283]  from-black py-20 px-6">
            <div className="max-w-6xl mx-auto bg-rd-400">
                {/* <div className='images_of_git_and_codefiesta flex justify-center items-center mb-10 bg-yellow-300'>
                    <img src="" alt="" className='w-10 bg-green-300' />
                </div> */}
                {/* Main Content */}
                <div className="text-center mb-16 flex flex-col justify-center items-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 mb-8 leading-tight">
                        Hack. Hustle. Innovate.<br />
                    </h2>

                    {/* <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className='my-custom-gradient py-10 px-4 rounded-lg backdrop-blur-lg '>
                        <button className="bg-gray-900 text-white px-14 py-4 rounded-lg font-medium text-2xl hover:bg-gray-800 transition-colors duration-200 shadow-lg  ">
                            REGISTER NOW
                        </button>
                    </a> */}

                    <a
                        href="https://vision.hack2skill.com/event/codefiestahackathon4/?utm_source=hack2skill&utm_medium=homepage&sectionid=68b6a3a3582ebb0d914d46aa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-block rounded-[9px] px-[1.5px] py-[1.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600"
                    >
                        <button className="relative z-10 bg-gray-900 text-white px-14 py-4 rounded-lg font-medium text-2xl transition-colors duration-300">
                            REGISTER NOW
                        </button>

                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r blur-lg from-pink-700 via-purple-600 to-blue-600 opacity-0 blu transition duration-500 group-hover:opacity-100 group-hover:scale-110"></span>
                    </a>
                </div>

                {/* Footer Navigation and Social */}
                <div className="flex flex-col lg:flex-row justify-between items-center pt-16 border-t border-gray-200">
                    {/* logo of codefiesta and GIT */}
                    <div className="flex flex-col lg:flex-row lg:items-center mb-8 lg:mb-0">
                        <div className="text-xl font-bold text-white mb-4 lg:mb-0 lg:mr-8">
                            CODEFIESTA
                        </div>
                        <div className="text-gray-600 text-sm">
                            © Copyright 2025, All Rights Reserved
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 mb-8 lg:mb-0">
                        <a className="text-gray-400 hover:text-gray-300 font-medium transition-colors">
                            Contact
                        </a>
                        <a className="text-gray-400 hover:text-gray-300 font-medium transition-colors">
                            +91 12345 67890
                        </a>
                        <a className="text-gray-400 hover:text-gray-300 font-medium transition-colors">
                            ,
                        </a>
                        <a className="text-gray-400 hover:text-gray-300 font-medium transition-colors">
                            +91 98765 43210
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a href="https://x.com/GIT_Jaipur?t=iKjpbvLJoy_zQoAqFD22eQ&s=09" className="text-gray-600 hover:text-gray-400 transition-colors">
                            <Twitter size={20} />
                            {/* <img src={x} alt="" className='w-5 text-white' /> */}
                            {/* <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> */}

                        </a>
                        <a href="https://www.facebook.com/gitjaipurofficial" className="text-gray-500 hover:text-gray-400 transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.instagram.com/_gitjaipur/" className="text-gray-500 hover:text-gray-400 transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://youtube.com/@gtccampusgtc-campus?si=g12wxG4sO_gpNy9F" className="text-gray-500 hover:text-gray-400 transition-colors">
                            <Youtube size={20} />
                        </a>
                        <a href="https://www.linkedin.com/school/global-institute-of-technology-jaipur/" className="text-gray-500 hover:text-gray-400 transition-colors">
                            <Linkedin size={20} />
                        </a>

                    </div>
                </div>
                {/* <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> */}

                {/* Bottom Links */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-end items-center gap-6 mt-8 pt-8">
                    <a href="#privacy" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                        Terms & Conditions
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Fot;