import React from "react";


const Rightball = ({ gradientColors }) => {
  return (
    <div className="relative w-[780px] h-[780px]">
      {/* Rotating Wrapper */}
      <div
        className="absolute w-full h-full rounded-full glowing-rotate"
        style={{
          background: gradientColors,
          boxShadow: `0 0 200px 100px ${gradientColors
            .split(",")
            .pop()
            .replace(")", ",0.8)")}`,
          filter: "blur(40px)",
        }}
      ></div>
    </div>
  );
};

export default Rightball;
