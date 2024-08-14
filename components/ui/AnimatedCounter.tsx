"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp end={amount} decimal="," prefix="NGN" duration={2.75} />
    </div>
  );
};

export default AnimatedCounter;
