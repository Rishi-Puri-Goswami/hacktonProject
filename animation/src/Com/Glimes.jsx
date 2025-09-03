import React from "react";
import { ReviewMarquee } from "../components/magicui/ReviewMarquee";
// import MentorMarquee from "../components/magicui/";

const Glimes = () => {
  return (
    <div className="min-h-[150vh]    w-full relative flex items-center justify-end overflow-hidden">
      {/* Text Content Container */}
      <div className="absolute top-10 bg-re-400 sm:top-16 md:top-20 left-2 sm:left-10 md:left-5 lg:left-5 z-10 flex flex-col justify-center items-start text-left max-w-full">
        {/* Main Heading */}
        <div className="text-3xl sm:text-4xl  md:text-5xl lg:text-6xl xl:text-7xl font-loadfont font-bold text-white leading-tight">
          <span className="block">Past</span>
          <span className="block  ">Codefiesta</span>
        </div>

        {/* Subheading */}
        <div className="text-base   sm:text-lg md:text-xl mb-3 lg:text-2xl xl:text-3xl mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-white font-light max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl leading-relaxed">
          Legacy  of our Previous CodeFiesta Hackathons
        </div>

        <div className="text-2xl h-fit mb-4 w-fit mt-2 font-semibold  font-loadfont  text-white">
          Legacy of Innovation

        </div>
        <div className="text-xl font-loadfont text-[20px]   text-white  flex-col  gap-5  ">
          <div className="mb-2">
            -  Over 500+ participants across multiple editions.

          </div>
          <div className="mb-2">
            - 100+ groundbreaking ideas pitched and prototyped.


          </div>
          <div className="w-30 ">
            -  Winning projects have gone on to become startups,
            <br />
            <div className="ml-10 ">

              open-source tools, and campus-wide solutions.
            </div>

          </div>
        </div>
      </div>






      {/* Review Marquee Container */}
      <div className="w-full h-full md:mt-[400px] lg:mt-[400px] lg:bg-geen-400 sm:mt-0 mt-[500px] flex items-center justify-end">
        <ReviewMarquee />
      </div>
    </div>

  );
};

export default Glimes;