import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

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
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <footer className="relative z-10  md bg-[#223888]  backdrop-blur-xl border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16 text-center">
        {/* Title + Tagline */}
        <div className="text-center mb-16 flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text  bg-white  mb-8 leading-tight">
            Hack. Hustle. Innovate.
          </h2>

          {/* Register Button (unchanged) */}
          <a
            href="https://vision.hack2skill.com/event/codefiestahackathon4/?utm_source=hack2skill&utm_medium=homepage&sectionid=68b6a3a3582ebb0d914d46aa"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block rounded-[9px] px-[1.5px] py-[1.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600"
          >
            <button className="relative z-10 bg-gray-900 text-white px-14 py-4 rounded-lg font-medium text-2xl transition-colors duration-300">
              REGISTER NOW
            </button>

            <span className="absolute inset-0 rounded-lg bg-gradient-to-r blur-lg from-pink-700 via-purple-600 to-blue-600 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-110"></span>
          </a>
        </div>

        {/* Footer Navigation and Social */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-10 border-t border-white/20">
          {/* Logo + Rights */}
          <div className="flex flex-col lg:flex-row lg:items-center mb-8 lg:mb-0">
            <div className="text-xl font-bold text-white mb-4 lg:mb-0 lg:mr-8">
              CODEFIESTA
            </div>
            <div className="text-blue-200 text-sm">
              © 2025, All Rights Reserved
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 mb-8 lg:mb-0 text-blue-200 text-sm">
            <a href="#about" className="hover:text-pink-400 transition-colors">
              Contact
            </a>
            <span className="hover:text-pink-400 transition-colors">
              +91 7568291852
            </span>
            <span>,</span>
            <span className="hover:text-pink-400 transition-colors">
              +91 7357580894
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {[
              { icon: Twitter, link: "https://x.com/GIT_Jaipur?t=iKjpbvLJoy_zQoAqFD22eQ&s=09" },
              { icon: Facebook, link: "https://www.facebook.com/gitjaipurofficial" },
              { icon: Instagram, link: "https://www.instagram.com/_gitjaipur/" },
              { icon: Youtube, link: "https://youtube.com/@gtccampusgtc-campus?si=g12wxG4sO_gpNy9F" },
              { icon: Linkedin, link: "https://www.linkedin.com/school/global-institute-of-technology-jaipur/" }
            ].map(({ icon: Icon, link }, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-75"></div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-pink-400 hover:border-pink-400/50 transition-all duration-300 hover:scale-125"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-end items-center gap-6 mt-8 pt-8 border-t border-white/20">
          <a href="#privacy" className="text-blue-200 hover:text-pink-400 text-sm transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="text-blue-200 hover:text-pink-400 text-sm transition-colors">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Fot;
