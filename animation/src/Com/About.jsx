import React from "react";
import EventHeader from "./EventHeader";

const About = () => {
  return (
    <div className="md:h-[150vh] min-h-screen bg-black w-full flex flex-col z-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-64 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-64 left-16 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="border-b-2 border-gradient flex whitespace-nowrap overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-pulse"></div>
        <EventHeader />
      </div>

      {/* Cards */}
      <div className="md:h-screen min-h-screen bg-black p-10 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 flex flex-col items-center justify-center relative z-10 gap-16">
        
        {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl text-center font-loadfont px-4">
  {/* Innovation */}
  <div className="group flex flex-col items-center justify-center backdrop-blur-sm bg-white/5 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-purple-400/30 transition-all duration-500 hover:shadow-purple-500/20">
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
      Innovation
    </div>
    <p className="text-neutral-300 mt-3 text-base sm:text-lg md:text-xl lg:text-2xl">
      Push boundaries and create groundbreaking solutions
    </p>
  </div>

  {/* Collaboration */}
  <div className="group flex flex-col items-center justify-center backdrop-blur-sm bg-white/5 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:shadow-blue-500/20">
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
      Collaboration
    </div>
    <p className="text-neutral-300 mt-3 text-base sm:text-lg md:text-xl lg:text-2xl">
      Work with talented developers from around the globe
    </p>
  </div>

  {/* Learning */}
  <div className="group flex flex-col items-center justify-center backdrop-blur-sm bg-white/5 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-green-400/30 transition-all duration-500 hover:shadow-green-500/20">
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
      Learning
    </div>
    <p className="text-neutral-300 mt-3 text-base sm:text-lg md:text-xl lg:text-2xl">
      Gain valuable experience and expand your skillset
    </p>
  </div>
</div>


        {/* Bottom stats */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 w-full max-w-6xl text-center font-loadfont">
          <div className="p-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/30 hover:bg-white/10 transition-all duration-500">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-green-400">700+</h2>
            <p className="text-neutral-300 mt-4 text-xl">Participants</p>
          </div>
          <div className="p-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-500">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-blue-400">150+</h2>
            <p className="text-neutral-300 mt-4 text-xl">Projects</p>
          </div>
          <div className="p-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-pink-400/30 hover:bg-white/10 transition-all duration-500">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-pink-400">20+</h2>
            <p className="text-neutral-300 mt-4 text-xl">Mentors</p>
          </div>
          <div className="p-10 bg-white/5 backdrop-blur-sm rounded-2xl w-fit border text-nowrap border-white/10 hover:border-yellow-400/30 hover:bg-white/10 transition-all duration-500">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-yellow-400">₹7 Lakh</h2>
            <p className="text-neutral-300 mt-4 text-xl">Prize Pool</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
