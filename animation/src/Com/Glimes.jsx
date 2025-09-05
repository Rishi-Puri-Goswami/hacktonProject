import React from "react";
import { ReviewMarquee } from "../components/magicui/ReviewMarquee";
import { motion } from "framer-motion";

const Glimes = () => {
  const images = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=6",
    "https://picsum.photos/200/300?random=7",
    "https://picsum.photos/200/300?random=8",
    "https://picsum.photos/200/300?random=9",
    "https://picsum.photos/200/300?random=10",
  ];

  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="min-h-[250vh]  py-10 w-full relative flex flex-col items-center justify-start overflow-hidden">
      {/* Content Box */}
      <div className="relative bg-gradient-to-br from-black/20 to-transparent backdrop-blur-sm rounded-2xl p-6 sm:p-10 z-10 flex flex-col justify-center items-start text-left max-w-[95%] sm:max-w-3xl border border-white/10">
        {/* Heading */}
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-loadfont font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Past
          </span>
          <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            CodeFiesta
          </span>
        </motion.div>

        {/* Subheading */}
        <motion.div
          className="text-base sm:text-lg md:text-xl mb-3 lg:text-2xl xl:text-3xl mt-6 sm:mt-10 md:mt-12 lg:mt-16 text-white font-light max-w-lg sm:max-w-xl md:max-w-2xl leading-relaxed"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Legacy of our Previous CodeFiesta Hackathons
          </span>
        </motion.div>

        {/* Legacy Title */}
        <motion.div
          className="text-xl sm:text-2xl h-fit mb-6 w-fit mt-4 font-semibold font-loadfont text-white flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-yellow-400 text-2xl sm:text-3xl">🏆</span>
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Legacy of Innovation
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="text-sm sm:text-base md:text-lg font-loadfont text-white flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Participant Count */}
          <motion.div
            className="mb-4 flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">👥</span>
            </div>
            <div>
              Over{" "}
              <span className="text-blue-400 font-bold text-xl mx-1">500+</span>
              <span className="text-blue-300">
                participants across multiple editions
              </span>
            </div>
          </motion.div>

          {/* Ideas */}
          <motion.div
            className="mb-4 flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-400/20 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">💡</span>
            </div>
            <div>
              <span className="text-green-400 font-bold text-xl mr-1">
                100+
              </span>
              <span className="text-yellow-300 font-semibold">
                groundbreaking ideas
              </span>
              <span className="text-green-300"> pitched and prototyped</span>
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            className="mb-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/20 backdrop-blur-sm hover:border-orange-400/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center mt-1">
                <span className="text-white font-bold text-sm">🚀</span>
              </div>
              <div className="flex-1">
                <div className="text-orange-300 font-semibold mb-2">
                  Winning projects have evolved into:
                </div>
                <div className="ml-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-red-400"></span>
                    <span className="text-pink-300 font-medium">
                      Successful startups
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></span>
                    <span className="text-cyan-300 font-medium">
                      Open-source tools
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-teal-400"></span>
                    <span className="text-green-300 font-medium">
                      Campus-wide solutions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Review Marquee */}
   <div
  className="w-full h-[80vh]      mt-12 sm:mt-20 flex items-center justify-center"
>
  <ReviewMarquee />
</div>
    </div>
  );
};

export default Glimes;
