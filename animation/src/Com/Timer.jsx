import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ targetDate = "2025-09-30T14:00:00" }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const rafRef = useRef(null);

  function getTimeLeft(targetDate) {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const tick = () => {
      setTimeLeft(getTimeLeft(targetDate));
      rafRef.current = requestAnimationFrame(tick);
    };
    tick(); // start immediately
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetDate]);

  return (
    <div className="text-center mb-8  w-fit absolute top-3">
      <div className="flex justify-center items-center gap-1 sm:gap-2 mb-8">
        <TimeBox label="Days" value={timeLeft.days} />
        <Colon />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <Colon />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <Colon />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="text-center  px-1">
    <div className="text-red-400 text-xs mb-1">{label}</div>
    <div className="text-lg font-bold text-red-400">
      {value}
    </div>
  </div>
);

const Colon = () => (
  <div className="text-2xl mt-2 font-bold text-red-500">
    :
  </div>
);

export default CountdownTimer;