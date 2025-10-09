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

  // Responsive X values for left & right
  const getXValue = (direction) => {
    if (window.innerWidth < 640) return direction * 100;   // small screens
    if (window.innerWidth < 1024) return direction * 250;  // medium screens
    return direction * 430;                                 // large screens
  };

  return (
    <div className="py-10 lg:py-28 text-center bg-gradient-to-t from-[#121212] to-[#1E1E1E] text-white overflow-hidden">
      <p className="text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500]">Clients</p>
      <p className="text-[16px] lg:text-[28px] mt-1 lg:mt-3 uppercase font-[neutral_face]">
        Building Lasting Partnerships with
        <br className="hidden md:block" /> Organizations Across Industries
      </p>

      {/* Carousel */}
      <div className="relative flex justify-center items-center py-18 md:py-38 lg:py-55">
        <AnimatePresence initial={false}>
          {visibleImages.map((client, idx) => {
            let scale = idx === 1 ? 1 : 0.8;
            let zIndex = idx === 1 ? 2 : 1;
            let x =
              idx === 0
                ? -getXValue(1)  // left
                : idx === 1
                ? 0               // center
                : getXValue(1);   // right

            return (
              <motion.img
                key={client.public_id || idx}
                src={client.url}
                alt="Client"
                style={{ zIndex }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale, x }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-[180px] md:w-[280px] lg:w-[418px] h-[100px] md:h-[180px] lg:h-[270px] object-cover border border-white"
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-6 ">
        <button onClick={handlePrev}>
          <img src={leftarrow} className="w-8 md:w-10 lg:w-auto" alt="left" />
        </button>
        <button onClick={handleNext}>
          <img src={rightarrow} className="w-8 md:w-10 lg:w-auto" alt="right" />
        </button>
      </div>
    </div>
  );
}

export default Clients;
