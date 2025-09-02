import React, { useState, useEffect, useRef } from 'react';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";

const TextEncrypted = ({ text, interval = 80, pause = 1000 }) => {
  const [outputText, setOutputText] = useState("");
  const [direction, setDirection] = useState("forward"); 
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const startAnimation = () => {
      clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setOutputText((prev) => {
          if (direction === "forward") {
            if (prev.length < text.length) {
              return prev + text[prev.length];
            } else {
              clearInterval(timerRef.current);
              setTimeout(() => setDirection("backward"), pause);
              return prev;
            }
          } else {
            if (prev.length > 0) {
              return prev.slice(0, -1);
            } else {
              clearInterval(timerRef.current);
              setTimeout(() => setDirection("forward"), pause);
              return prev;
            }
          }
        });
      }, interval);
    };

    startAnimation();

    return () => clearInterval(timerRef.current);
  }, [direction, isMounted, interval, pause, text]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      : "";

  return (
    <span className="md:text-[3vw] text-[6vw] font-light text-white font-loadfont transition-all duration-300 ease-in-out">
      {outputText}
      <span className="opacity-90">{remainder}</span>
    </span>
  );
};

const Loading = () => {
  return (
    <div className="h-screen w-full  bg-[#010138] flex items-center justify-center">
      <TextEncrypted text="Codefiesta 4.0" interval={70} pause={400} />
      
    </div>
  );
};

export default Loading;
