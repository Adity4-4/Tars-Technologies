import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import rightarrow from "../../assets/icons/r-arrow.png";
import leftarrow from "../../assets/icons/l-arrow.png";

function Clients() {
  const [clients, setClients] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  // Fetch client images
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/clients");
        if (res.data.success) {
          setClients(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    };
    fetchClients();
  }, []);

  // Next/Prev handlers
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % clients.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  // Compute visible images
  const getVisibleImages = () => {
    if (clients.length <= visibleCount) return clients;
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % clients.length;
      visible.push(clients[index]);
    }
    return visible;
  };

  const visibleImages = getVisibleImages();

  // Motion variants for left, middle, right
  const positions = [
    {
      scale: 0.8,
      x: -430,
      zIndex: 1,
      className: "w-[170px] md:w-[320px] h-[110px] md:h-[220px]"
    },
    {
      scale: 1,
      x: 0,
      zIndex: 2,
      className: "w-[220px] md:w-[418px] h-[140px] md:h-[270px]"
    },
    {
      scale: 0.8,
      x: 430,
      zIndex: 1,
      className: "w-[170px] md:w-[320px] h-[110px] md:h-[220px]"
    }
  ];

  return (
    <div className="py-10 lg:py-28 text-center bg-gradient-to-t from-[#121212] to-[#1E1E1E] text-white overflow-hidden">
      <p className="text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500]">Clients</p>
      <p className="text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]">
        Building Lasting Partnerships with
        <br className="hidden md:block" /> Organizations Across Industries
      </p>

      {/* Carousel */}
      <div className="relative flex justify-center items-center py-8 md:py-55">
        <AnimatePresence initial={false}>
          {visibleImages.map((client, idx) => {
            const { scale, x, zIndex } = positions[idx]; // only scale & x
            return (
              <motion.img
                key={client.public_id || idx}
                src={client.url}
                alt="Client"
                style={{ zIndex }} // control stacking
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale, x }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-[220px] md:w-[418px] h-[140px] md:h-[270px] object-cover border border-white "
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-6 ">
        <button onClick={handlePrev}>
          <img src={leftarrow} className="w-8 lg:w-auto" alt="left" />
        </button>
        <button onClick={handleNext}>
          <img src={rightarrow} className="w-8 lg:w-auto" alt="right" />
        </button>
      </div>
    </div>
  );
}

export default Clients;
