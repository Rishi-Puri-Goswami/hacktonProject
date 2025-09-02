import React from "react";

const GlowingBall = ({ gradientColors }) => {
  return (
    <div className="relative w-[780px] h-[780px]">
      <style>
        {`
          @keyframes revolve {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Orbit Container */}
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          animation: "revolve 10s linear infinite",
          transformOrigin: "center",
        }}
      >
        {/* Offset Ball */}
        <div
          className="absolute md:w-[500px] md:h-[500px] w-[30px] h-[30x] rounded-full"
          style={{
            left: "50%",             // start at center
            top: "70%",              // push ball downward for orbit
            transform: "translate(-50%, -50%)", // center offset
            background: gradientColors,
            boxShadow: `0 0 200px 100px ${gradientColors
              .split(",")
              .pop()
              .replace(")", ",0.8)")}`,
            filter: "blur(40px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GlowingBall;
