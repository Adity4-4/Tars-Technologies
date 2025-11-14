import React, { useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";


// handles the animation
function CountUp({ value }) {
  const target = parseInt(value.replace(/\D/g, ""));  // target = 50
  const suffix = value.replace(/\d/g, ""); // suffix = "+"
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // detects when 
  const motionValue = useMotionValue(0); // starts from 0

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration: 1.5,
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(v) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// using Counts displays all the stats
function Counts() {
  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "5+", label: "Successful Years" },
    { value: "98%", label: "Client Retention" },
    { value: "10+", label: "Countries" },
  ];

  return (
    <div className="flex justify-center items-center gap-2 md:gap-8 lg:gap-25 px-3 md:px-0 py-6 md:py-10 lg:py-15 bg-[#121212] text-white">
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <div className="text-center space-y-1 md:space-y-4 lg:space-y-5">
            <p className="text-[15px] md:text-[22px] lg:text-[36px] font-[neutral_face]">
              <CountUp value={stat.value} />
            </p>
            <p className="text-[9px] md:text-[15px] lg:text-[18px] text-[#9C9C9C]">
              {stat.label}
            </p>
          </div>
          {index < stats.length - 1 && (
            <div className="bg-white w-[1px] h-10 md:h-12 lg:h-18"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Counts;
