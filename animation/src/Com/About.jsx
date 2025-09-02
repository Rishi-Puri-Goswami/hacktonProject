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
    <div className="h-[150vh] bg-black w-full flex flex-col z-20 relative">
      <div className="border-b-2 flex whitespace-nowrap overflow-hidden">
        <EventHeader />
      </div>
      <div className="h-screen bg-black p-3 bg-gradient-to-br flex-col flex items-start justify-center">
        <div className="w-full h-full bg-rd-400/20 md:text-3xl md:p-16 md:gap-16 items-start justify-center flex gap-3 font-semibold font-loadfont text-neutral-300 mt-3 text-[25px]">
          <div className="">
            <div className="text-center text-4xl text-nowrap mb-9">OPEN INNOVATION</div>
            <div className="text-justify text-2xl">
              {wrapWords(
                'In the wild world of open innovation, we’re not just pushing boundaries we’re yeeting them into the next galaxy! Picture a chaotic brainstorm where ideas collide like cosmic particles, sparking groundbreaking solutions that make even the grumpiest skeptics chuckle. From wacky prototypes to "aha!" moments that strike with the force of a stray asteroid, open innovation is the dreamer’s playground, the tinkerer’s haven, and the mad genius’s sandbox where they can redefine the rules with a wink and a smile.'
              )}
            </div>
          </div>

          <div className="">
            <div className="text-center text-4xl mb-9">COLLABORATION</div>
            <div className="text-justify text-2xl">
              {wrapWords(
                'Cooperation’s like throwing a world geek-party where gifted programmers from all over the globe crash the bash! Imagine coders from Tokyo to Timbuktu, trading crazy ideas, debugging catastrophes, and concocting legendary solutions over virtual coffee. It’s a crazy, genial mashup of smarts, where time zones are optional and the only principle is to create something amazing together—ideally with a side of sarcasm!'
              )}
            </div>
          </div>

          <div className="">
            <div className="text-center text-4xl mb-9">LEARNING</div>
            <div className="text-justify text-2xl">
              {wrapWords(
                'Learning’s like diving into a cosmic skill-buffet, where you gobble up valuable experience and supercharge your skillset with every byte! Imagine a global classroom packed with brain-tickling challenges, where developers from all corners swap tricks, wrestle with code, and level up faster than a speedrunner on caffeine. It’s a wild ride of “eureka!” moments, sprinkled with just enough chaos to keep you grinning as you grow!'
              )}
            </div>
          </div>
        </div>
        <FloatingStars />
      </div>
    </div>
  )
}

export default About