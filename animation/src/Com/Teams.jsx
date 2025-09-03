import React, { useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaStar, FaInstagram, FaFacebook } from "react-icons/fa";
// import pratulImg from "../assets/pr1.jpg";
// import rishiImg from "../assets/rishi1.png";
// import ishwarImg from "../assets/ish1.jpeg";
// import mukulImg from "../assets/mukul1.jpg";



const TeamPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/30 to-violet-500/30 blur-3xl animate-pulse"
          style={{
            left: mousePos.x * 0.05,
            top: mousePos.y * 0.05,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl animate-pulse"></div>

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping md:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 py-6 md:py-16 lg:py-20 text-center">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-3 md:mb-6 animate-pulse tracking-tight">
            OUR TEAM
          </h1>
          <div className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/10 blur-sm">
            OUR TEAM
          </div>
        </div>

        <div className="flex justify-center items-center space-x-3 md:space-x-4 mb-3 md:mb-8">
          <div className="w-8 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-pink-500 to-violet-500 animate-pulse"></div>
          <FaStar className="text-yellow-400 text-lg md:text-2xl animate-spin" />
          <div className="w-8 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-violet-500 to-indigo-500 animate-pulse"></div>
        </div>

        <p className="text-sm md:text-xl lg:text-2xl text-blue-100 max-w-2xl lg:max-w-3xl mx-auto px-4 leading-relaxed">
          🚀 Meet the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold">
            extraordinary minds
          </span>{" "}
          shaping the future
        </p>
      </div>

      {/* Conveners */}
      <TeamSection
        title="🏆 Conveners"
        subtitle="The Visionaries"
        members={[
          {
            name: "Pradeep Jha",
            role: "Lead Visionary",
            level: "legendary",
            image: "/images/pradeep.jpg",
          },
          {
            name: "Pankaj Jain",
            role: "Strategic Mind",
            level: "legendary",
            image: "/images/pankaj.jpg",
          },
        ]}
        cardSize="large"
        gradient="from-pink-600 to-rose-500"
      />

      {/* Developers */}
      <TeamSection
        title="💻 Developers"
        subtitle="Code Warriors"
        members={[
          {
            name: "Sahil Vaishnav",
            role: "Full Stack Ninja",
            level: "master",
            image: "https://ik.imagekit.io/rcfcr7y0e/1750825936202.jpeg?updatedAt=1756941821776",
            socials: { github: "https://github.com/Sahil9079100", linkedin: "https://www.linkedin.com/in/sahil-vaishnav-77b759371/",instagram: "https://www.instagram.com/sahil_vaishnav99/" },
          },
          {
            name: "Rishi Goswami",
            role: "Full Stack Ninja",
            level: "master",
            image: "https://ik.imagekit.io/rcfcr7y0e/WhatsApp%20Image%202025-09-03%20at%2016.21.57_fe6a40d1.jpg?updatedAt=1756941552583",
            socials: { github: "https://github.com/Rishi-Puri-Goswami", linkedin: "https://www.linkedin.com/in/rishi-puri-21919b32b/",instagram: "https://www.instagram.com/ronitgoswami_7/" },
          },
          {
            name: "Mukul Gahlot",
            role: "Full Stack Ninja",
            level: "master",
            image: "https://ik.imagekit.io/rcfcr7y0e/WhatsApp%20Image%202025-09-03%20at%2016.32.24_546657de.jpg?updatedAt=1756941607755",
            socials: { github: "https://github.com/mukulzar", linkedin: "https://www.linkedin.com/in/mukul-gahlot-405115310/",instagram: "https://www.instagram.com/mukulzar/" },
          },
          {
            name: "Sachin Gupta",
            role: "DevOps Maestro",
            level: "master",
            image: "https://ik.imagekit.io/rcfcr7y0e/WhatsApp%20Image%202025-09-03%20at%2016.36.28_80628db0.jpg?updatedAt=1756941649187",
            socials: { github: "https://github.com/SachinXCode313", linkedin: "https://www.linkedin.com/in/sachingupta313/",instagram: "https://www.instagram.com/its.sachin_91/" },
          },
          {
            name: "Pratul Agarwal",
            role: "H2S Platform Handler",
            level: "master",
            image: "pratulImg",
            socials: { linkedin: "https://www.linkedin.com/in/pratul-agarwal-173190261/",instagram: "https://www.instagram.com/pratulagarwal123/" },
          },
          {
            name: "Ishwar Verma",
            role: "UI/UX Designer",
            level: "master",
            image: "ishwarImg",
            socials: { linkedin: "https://www.linkedin.com/in/ishwar-verrma/",instagram: "https://www.instagram.com/ishwarr.verma/" },
          },
        ]}
        cardSize="medium"
        gradient="from-blue-600 to-cyan-500"
        specialLayout
      />

      {/* Footer */}
      <footer className="relative z-10 mt-12 md:mt-20 bg-black/40 backdrop-blur-xl border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4">
            Contact Us
          </h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Have questions or want to collaborate? Reach out and let’s build
            something amazing together.
          </p>

          <div className="flex justify-center space-x-4 md:space-x-6 lg:space-x-8 mb-6">
            {[
              {
                icon: FaLinkedin,
                link: "https://www.linkedin.com/school/global-institute-of-technology-jaipur/",
              },
              {
                icon: FaTwitter,
                link: "https://x.com/GIT_Jaipur?t=iKjpbvLJoy_zQoAqFD22eQ&s=09",
              },
              { icon: FaInstagram, link: "https://www.instagram.com/_gitjaipur/" },
              {
                icon: FaFacebook,
                link: "https://www.facebook.com/gitjaipurofficial",
              },
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

          <div className="text-xs md:text-sm text-blue-200">
            <p className="mb-1">📧 codefiesta@gitjaipur.com</p>
            <p>© {new Date().getFullYear()} Hackathon 4.0. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TeamSection = ({ title, subtitle, members, cardSize, gradient, specialLayout }) => {
  return (
    <div className="relative z-10 py-4 md:py-12 lg:py-16 px-3 md:px-6 lg:px-8">
      <div className="max-w-5xl lg:max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-2 md:mb-4 relative">
            <span className="relative z-10">{title}</span>
            <div className="absolute inset-0 text-white/20 blur-sm scale-110">{title}</div>
          </h2>
          <p className="text-sm md:text-lg xl:text-xl text-purple-200 font-semibold">{subtitle}</p>
          <div
            className={`w-12 md:w-20 lg:w-24 h-1 lg:h-2 bg-gradient-to-r ${gradient} mx-auto mt-2 md:mt-4 lg:mt-6 rounded-full animate-pulse`}
          ></div>
        </div>

        {/* Special developer layout */}
        {specialLayout ? (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-6">
              {members.slice(0, 4).map((m, i) => (
                <TeamCard key={i} member={m} size={cardSize} gradient={gradient} delay={i * 0.1} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {members.slice(4).map((m, i) => (
                <TeamCard key={i + 4} member={m} size={cardSize} gradient={gradient} delay={i * 0.1} />
              ))}
            </div>
          </div>
        ) : (
          <div
            className={
              title.includes("Conveners")
                ? "flex justify-center gap-2 md:gap-6 lg:gap-8 flex-wrap"
                : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8"
            }
          >
            {members.map((member, index) => (
              <TeamCard key={index} member={member} size={cardSize} gradient={gradient} delay={index * 0.1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TeamCard = ({ member, size, gradient, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case "large":
        return "w-36 h-44 md:w-64 md:h-80 lg:w-72 lg:h-96 xl:w-80 xl:h-[420px]";
      case "medium":
        return "w-32 h-40 md:w-56 md:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-[380px]";
      case "small":
        return "w-28 h-36 md:w-48 md:h-64 lg:w-56 lg:h-72 xl:w-64 xl:h-[340px]";
      default:
        return "w-32 h-40 md:w-56 md:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-[380px]";
    }
  };

  const getLevelEmoji = () => {
    switch (member.level) {
      case "legendary":
        return "👑";
      case "master":
        return "⭐";
      case "expert":
        return "💎";
      case "pro":
        return "🏆";
      default:
        return "🚀";
    }
  };

  return (
    <div
      className={`${getSizeClasses()} group relative overflow-hidden rounded-2xl lg:rounded-3xl transition-all duration-500 md:duration-700 hover:scale-105 lg:hover:scale-110 cursor-pointer flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Animated Border */}
      <div
        className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500 animate-spin p-0.5 lg:p-1"
        style={{ animationDuration: "3s" }}
      >
        <div className="w-full h-full rounded-2xl lg:rounded-3xl bg-gray-900"></div>
      </div>

      {/* Card Content */}
      <div className="absolute inset-0.5 lg:inset-1 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl border border-white/20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

        {/* Profile Image */}
        <div className="relative flex-grow p-2 lg:p-6 flex flex-col justify-center items-center">
          <div className="relative mb-2 md:mb-4 lg:mb-6">
            <img
              src={member.image}
              alt={member.name}
              className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full object-cover border-2 lg:border-4 border-white/30"
            />
            <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs md:text-lg lg:text-xl animate-bounce border border-white lg:border-2">
              {getLevelEmoji()}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="relative flex-shrink-0 p-2 md:p-4 lg:p-14 bg-black/40 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-xs md:text-sm lg:text-lg font-black text-white mb-1 lg:mb-2">
              {member.name}
            </h3>
            <p className="text-purple-300 text-xs lg:text-sm font-semibold mb-2 lg:mb-4">
              {member.role}
            </p>

            {/* Socials */}
            <div className="flex justify-center space-x-2">
              {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:text-pink-400 hover:border-pink-400 transition-all"
                >
                  <FaLinkedin className="w-3 h-3" />
                </a>
              )}
              {member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:text-pink-400 hover:border-pink-400 transition-all"
                >
                  <FaGithub className="w-3 h-3" />
                </a>
              )}
              {member.socials?.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:text-pink-400 hover:border-pink-400 transition-all"
                >
                  <FaInstagram className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
