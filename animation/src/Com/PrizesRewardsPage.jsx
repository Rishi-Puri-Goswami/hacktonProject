import React, { useState, useEffect } from "react";

const TiltCard = ({ amount = "7,00,000", currency = "₹", size = "large", title = "", subtitle = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotate({
      x: -((y - centerY) / centerY) * 12,
      y: ((x - centerX) / centerX) * 12,
    });

    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
    setIsHovered(false);
  };

  // Size configurations
  const sizeConfigs = {
    large: {
      container: "w-[300px] sm:w-[460px] md:w-[620px] h-[200px] sm:h-[300px] md:h-[300px]",
      currencyText: "text-4xl sm:text-5xl md:text-7xl",
      amountText: "text-2xl sm:text-3xl md:text-5xl",
      glowOrb: "w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32",
      cornerSize: "w-6 sm:w-8 h-6 sm:h-8",
      spacing: "space-x-3 sm:space-x-4 md:space-x-6"
    },
    small: {
      container: "w-[280px] h-[180px]",
      currencyText: "text-2xl",
      amountText: "text-xl",
      glowOrb: "w-16 h-16",
      cornerSize: "w-4 h-4",
      spacing: "space-x-2"
    }
  };

  const config = sizeConfigs[size];

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
      className={`${config.container} z-50 rounded-xl sm:rounded-2xl cursor-pointer flex items-center justify-center text-white relative overflow-hidden backdrop-blur-sm mx-4`}
    >
      {/* Glow Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            transform: `translate(${shinePos.x * 0.1}px, ${shinePos.y * 0.1}px)`,
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Floating Particles */}
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

      {/* Glow Orb */}
      <div
        className={`absolute z-50 ${config.glowOrb} rounded-full opacity-20 blur-xl`}
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)`,
          left: `${shinePos.x - 16}%`,
          top: `${shinePos.y - 16}%`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease",
        }}
      />

      {/* Main Content */}
      <div className={`flex z-50 items-center ${config.spacing} relative`}>
        <div className="relative">
          <div className="flex flex-col gap-2">
            {(title || subtitle) && (
              <div className="text-center mb-2">
                {title && (
                  <div className="text-sm text-violet-300 font-medium tracking-wide">
                    {title}
                  </div>
                )}
                {subtitle && (
                  <div className="text-xs text-gray-300 opacity-70">
                    {subtitle}
                  </div>
                )}
              </div>
            )}
            <div className="items-center justify-center h-fit w-fit flex">
              <div className={`${config.currencyText} font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 via-purple-300 to-indigo-300 drop-shadow-2xl`}>
                {currency}
              </div>
              {isHovered && (
                <div className={`absolute inset-0 ${config.currencyText} font-bold text-violet-300 blur-sm opacity-50 animate-pulse`}>
                  {currency}
                </div>
              )}
              <div className="text-right">
                <div className={`${config.amountText} font-bold    text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-violet-200 tracking-tight leading-none`}>
                  {amount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Highlights */}
      <div className={`absolute top-2 left-2 ${config.cornerSize} border-l-2 border-t-2 border-violet-400 opacity-30 rounded-tl-lg`} />
      <div className={`absolute top-2 right-2 ${config.cornerSize} border-r-2 border-t-2 border-violet-400 opacity-30 rounded-tr-lg`} />
      <div className={`absolute bottom-2 left-2 ${config.cornerSize} border-l-2 border-b-2 border-violet-400 opacity-30 rounded-bl-lg`} />
      <div className={`absolute bottom-2 right-2 ${config.cornerSize} border-r-2 border-b-2 border-violet-400 opacity-30 rounded-br-lg`} />
    </div>
  );
};

const PrizesRewardsPage = () => {
  return (
    <div className="z-50 min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black" />

      {/* Cards */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl sm:text-6xl flex items-center  justify-center   md:text-7xl font-bold text-white mb-10">
          Prizes & Rewards
        </h1>
        <TiltCard 
          amount="7,00,000"
          title="Total Prize Pool"
          subtitle="Turn your ideas into reality and win amazing prizes"
        />

        <div className="flex gap-4 mt-20 flex-wrap justify-center">
          <TiltCard 
            amount="1,50,000" 
            title="Grand Prize Pool" 
            subtitle="Total prize pool for innovative solutions"
            size="small"
          />
          <TiltCard 
            amount="Exciting Prizes" 
            currency=""
            title="Special Categories" 
            subtitle="Best UI/UX, Most Innovative, Best Use of AI"
            size="small"
          />
          <TiltCard 
            amount="Career Growth" 
            currency=""
            title="Internship Opportunities" 
            subtitle="Chance to work with leading tech companies"
            size="small"
          />
          <TiltCard 
            amount="For Everyone" 
            currency=""
            title="Swag & Goodies" 
            subtitle="T-shirts, stickers, and exclusive merchandise"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default PrizesRewardsPage;