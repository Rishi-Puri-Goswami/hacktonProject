import React from 'react'
import EventHeader from './EventHeader'
import FloatingStars from './FloatingStars'

const About = () => {
  // Function to wrap each word in a span with hover effect
  const wrapWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className="relative transition-all duration-300 ease-in-out cursor-default hover:text-purple-600"
        style={{
          textShadow:
            '0 0 500px rgba(147,51,234,0), 0 0 10px rgba(147,51,234,0), 0 0 20px rgba(147,51,234,0)',
        }}
        onMouseEnter={(e) => {
          e.target.style.textShadow =
            '0 0 500px rgba(147,51,234,0.6), 0 0 15px rgba(147,51,234,0.8), 0 0 25px rgba(147,51,234,1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.textShadow =
            '0 0 500px rgba(147,51,234,0), 0 0 10px rgba(147,51,234,0), 0 0 20px rgba(147,51,234,0)';
        }}
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div
    // data-scroll data-scroll-speed="3"
    className="md:h-[150vh] min-h-screen bg-black w-full flex flex-col z-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-64 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-64 left-16 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="border-b-2 border-gradient flex whitespace-nowrap overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-pulse"></div>
        <EventHeader />
      </div>
      <div className="md:h-screen min-h-screen bg-black p-3 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 flex-col flex items-start justify-center relative">
        <div className="w-full h-full bg-rd-400/20 md:text-3xl md:p-16 md:gap-16 md:flex-row md:items-stretch items-center justify-center flex flex-col gap-8 sm:gap-12 font-semibold font-loadfont text-neutral-300 mt-3 text-[20px] sm:text-[22px] p-4 sm:p-6 relative z-10">
          
          <div className="md:flex-1 md:w-1/3 w-full h-full md:h-auto group flex flex-col">
            <div className="text-center md:text-4xl text-2xl sm:text-3xl text-nowrap md:mb-9 mb-6 relative">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent font-bold tracking-wide">
                OPEN INNOVATION
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:w-32 transition-all duration-500"></div>
            </div>
            <div className="flex-1 text-justify md:text-2xl text-base sm:text-lg leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-purple-400/30 transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-xl overflow-y-auto">
              {wrapWords(
                'In the wild world of open innovation, we’re not just pushing boundaries we’re yeeting them into the next galaxy! Picture a chaotic brainstorm where ideas collide like cosmic particles, sparking groundbreaking solutions that make even the grumpiest skeptics chuckle. From wacky prototypes to "aha!" moments that strike with the force of a stray asteroid, open innovation is the dreamer’s playground, the tinkerer’s haven, and the mad geniuss sandbox where they can redefine the rules with a wink and a smile.'
              )}
            </div>
          </div>

          <div className="md:flex-1 md:w-1/3 w-full h-full md:h-auto group flex flex-col">
            <div className="text-center md:text-4xl text-2xl sm:text-3xl md:mb-9 mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold tracking-wide">
                COLLABORATION
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:w-32 transition-all duration-500"></div>
            </div>
            <div className="flex-1 text-justify md:text-2xl text-base sm:text-lg leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:shadow-blue-500/20 hover:shadow-xl overflow-y-auto">
              {wrapWords(
                'Cooperation’s like throwing a world geek-party where gifted programmers from all over the globe crash the bash! Imagine coders from Tokyo to Timbuktu, trading crazy ideas, debugging catastrophes, and concocting legendary solutions over virtual coffee. It’s a crazy, genial mashup of smarts, where time zones are optional and the only principle is to create something amazing together—ideally with a side of sarcasm!'
              )}
            </div>
          </div>

          <div className="md:flex-1 md:w-1/3 w-full h-full md:h-auto group flex flex-col">
            <div className="text-center md:text-4xl text-2xl sm:text-3xl md:mb-9 mb-6 relative">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent font-bold tracking-wide">
                LEARNING
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full group-hover:w-32 transition-all duration-500"></div>
            </div>
            <div className="flex-1 text-justify md:text-2xl text-base sm:text-lg leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-green-400/30 transition-all duration-500 hover:shadow-green-500/20 hover:shadow-xl overflow-y-auto">
              {wrapWords(
                'Learning’s like diving into a cosmic skill-buffet, where you gobble up valuable experience and supercharge your skillset with every byte! Imagine a global classroom packed with brain-tickling challenges, where developers from all corners swap tricks, wrestle with code, and level up faster than a speedrunner on caffeine. It’s a wild ride of "eureka!" moments, sprinkled with just enough chaos to keep you grinning as you grow!'
              )}
            </div>
          </div>
        </div>
        {/* <FloatingStars /> */}
      </div>
    </div>
  )
}

export default About