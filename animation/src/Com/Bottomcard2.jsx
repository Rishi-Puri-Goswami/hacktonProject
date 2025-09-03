import React, { useState } from "react";

const TiltCard = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Enhanced tilt calculation for smooth movement in all directions
    const rotateY = ((x - centerX) / centerX) * 12; // Reduced intensity for smoother effect
    const rotateX = -((y - centerY) / centerY) * 12; // Negative for natural tilt

    setRotate({ x: rotateX, y: rotateY });

    // Shine effect follows mouse more precisely
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setShinePos({ x: shineX, y: shineY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <div
    
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        background: `
          radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, 
            rgba(255,255,255,${isHovered ? 0.4 : 0.1}) 0%, 
            rgba(255,255,255,0) 50%),
          linear-gradient(135deg, 
            #0a0a0f 0%, 
            #1a1a2e 25%, 
            #16213e 50%, 
            #0f3460 75%, 
            #533483 100%),
          linear-gradient(45deg, 
            transparent 30%, 
            rgba(255,255,255,0.02) 50%, 
            transparent 70%)
        `,
        border: isHovered
          ? "1px solid rgba(139, 92, 246, 0.8)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? `0 25px 50px rgba(139, 92, 246, 0.3),
             0 15px 35px rgba(0, 0, 0, 0.4),
             inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : `0 15px 35px rgba(0, 0, 0, 0.3),
             0 5px 15px rgba(0, 0, 0, 0.2),
             inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    className="w-[400px] sm:w-[460px] md:w-[620px] z-50 h-[250px] sm:h-[300px] md:h-[300px] rounded-xl sm:rounded-2xl cursor-pointer flex items-center justify-center text-white relative overflow-hidden backdrop-blur-sm mx-4"
    >
      {/* Animated background grid */}
      <div 
      
      className="absolute inset-0 opacity-10">
        
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            transform: `translate(${shinePos.x * 0.1}px, ${shinePos.y * 0.1}px)`,
            transition: 'transform 0.3s ease'
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.2,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
          }}
        />
      ))}

      {/* Glowing orb effect */}
      <div
        className="absolute z-50 w-24 sm:w-28 md:w-32 h-24   sm:h-28 md:h-32 rounded-full opacity-20 blur-xl"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)`,
          left: `${shinePos.x - 16}%`,
          top: `${shinePos.y - 16}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease',
        }}
      />

      {/* Main content */}
      <div className="flex z-50 items-center space-x-3 sm:space-x-4 md:space-x-6 relative">
        {/* Currency symbol with glow */}

        <div className="relative">
          <div className="flex flex-col   gap-2"> 
            <div className=" items-center justify-center h-fit w-fit flex ">

          <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 via-purple-300 to-indigo-300 drop-shadow-2xl">
            ₹
          </div>
          {isHovered && (
            <div className="absolute inset-0 text-4xl sm:text-5xl md:text-7xl font-bold text-violet-300 blur-sm opacity-50 animate-pulse">
              ₹
            </div>
          )}

        {/* Amount with enhanced typography */}

        <div className="text-right ">
          <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-violet-200 tracking-tight leading-none">
            7,00,000
          </div>
        </div>
          
          </div>
       

         
        </div>


         <div className="text-xs   h-fit w-fit items-center  justify-center flex     sm:text-sm text-gray-100 mt-4 tracking-widest uppercase opacity-80">

          </div>
        </div>
      </div>

      {/* Premium border glow */}
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-50"
        style={{
          background: `linear-gradient(135deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)`,
          transform: `rotate(${rotate.y * 0.5}deg)`,
          transition: 'transform 0.3s ease'
        }}
      />

      {/* Corner highlights */}
      <div className="absolute top-2 left-2 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-t-2 border-violet-400 opacity-30 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-t-2 border-violet-400 opacity-30 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-6 sm:w-8 h-6 sm:h-8 border-l-2 border-b-2 border-violet-400 opacity-30 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-6 sm:w-8 h-6 sm:h-8 border-r-2 border-b-2 border-violet-400 opacity-30 rounded-br-lg" />
    </div>
  );
};

const ConfettiFireworks = () => {
  const [particles, setParticles] = useState([]);

  React.useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
    const newParticles = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 3,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-bounce opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </div>
  );
};

const Bottomcard2 = () => {
  return (
    <div

    className= " z-50 min-h-screen w-full relative overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="z-10 absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black" />

      {/* Animated background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.2) 0%, transparent 50%)
          `
        }}
      />

      {/* Dynamic grid overlay */}
      <div


        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Floating ambient particles - reduced count on mobile */}
      {[...Array(window.innerWidth < 768 ? 15 : 30)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-violet-400 rounded-full opacity-20 blur-sm animate-pulse"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header section with enhanced styling */}
        <div className="h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-full font-bold flex flex-col items-center justify-center text-white relative px-4">
          {/* Background glow for title */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent" />

          <div className="relative z-10 text-center">
            <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-purple-300 drop-shadow-2xl leading-tight font-extrabold tracking-tight">
              Prizes & Rewards
            </div>
            {/* Subtitle glow line */}
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-2 sm:mt-3 md:mt-4 rounded-full blur-sm" />
          </div>
        </div>

        {/* Card section */}
        <div className="flex-1 w-full flex flex-col items-center justify-center relative py-8 sm:py-12 md:py-16">
          {/* Background spotlight effect */}
          <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 via-transparent to-transparent" />

          <TiltCard />
          <div className="h-fit w-fit z-50 mt-20  flex gap-4">
          <TiltCard />
          <TiltCard />
          <TiltCard />
          </div>
       

          {/* Subtle bottom accent */}
          <div className="mt-4 sm:mt-6 md:mt-8 text-center text-gray-400 text-xs sm:text-sm tracking-widest uppercase opacity-60 px-4">
            Grand Prize Winner
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .bg-gradient-radial {
            background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
          }
        }
      `}</style>

      {/* <ConfettiFireworks /> */}
    </div>
  );
};

export default Bottomcard2;