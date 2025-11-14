import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import htmlIcon from "../../assets/icons/tech2.png";
import cssIcon from "../../assets/icons/tech1.png";
import pythonIcon from "../../assets/icons/tech3.png";
import wordPressIcon from "../../assets/icons/tech4.png";
import leftarrow from "../../assets/icons/l-arrow.png";
import rightarrow from "../../assets/icons/r-arrow.png";

const techIcons = {
  HTML: htmlIcon,
  CSS: cssIcon,
  Python: pythonIcon,
  WordPress: wordPressIcon,
  // JavaScript: jsIcon,
  // React: reactIcon,
  // Nodejs: nodeIcon,
  // MongoDB: mongodbIcon,
};

function Products() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // for animation direction
  const [imageIndex, setImageIndex] = useState(0);

  // Read More state
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const maxLength = 300; // max characters before "Read More"

  const currentProduct = products[currentIndex];

  useEffect(() => {
    if (!currentProduct?.images || currentProduct.images.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setImageIndex((prev) => (prev + 1) % currentProduct.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentProduct]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };


  // Framer Motion variants for sliding animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      position: "absolute",
    }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit: (direction) => ({
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div className="py-10 lg:py-28 text-center bg-gradient-to-bl from-[#1E1E1E] to-[#121212] text-white relative overflow-hidden">
      <p data-aos="fade-down" className="text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500]">Product</p>
      <p data-aos="fade-up" className="text-[16px] md:text-[22px] lg:text-[28px] mt-1 md:mt-3 px-6 md:px-0 uppercase font-[neutral_face]">
        From Challenge to Victory: Exploring Case
        <br className="hidden md:block" /> Studies of Innovation and Excellence
      </p>

      <div data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="relative flex flex-col lg:flex-row justify-center mt-6 lg:mt-14 px-5 md:px-5 lg:min-h-[300px]">
        <AnimatePresence initial={false} custom={direction}>
          {currentProduct && (
            <motion.div
              key={currentProduct._id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="flex flex-col md:flex-row gap-5 lg:gap-15  "
            >

              {/* Image carousel */}

              <div  className="w-full md:w-[350px] lg:w-[650px] md:h-[460px] relative overflow-hidden rounded">
                <AnimatePresence custom={direction}>
                  <motion.img    
                    key={currentProduct.images[imageIndex]?.url}
                    src={currentProduct.images[imageIndex]?.url}
                    alt="product"
                    className="absolute top-0 left-0 w-full h-full object-fit rounded"
                    custom={direction}
                    variants={{
                      enter: (direction) => ({
                        x: direction > 0 ? "100%" : "-100%",
                        opacity: 1,
                        position: "absolute",
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        position: "relative",
                      },
                      exit: (direction) => ({
                        x: direction < 0 ? "100%" : "-100%",
                        opacity: 1,
                        position: "absolute",
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "tween", ease: "easeInOut", duration: 1.2 },
                      opacity: { duration: 1 },
                    }}
                  />
                </AnimatePresence>

              </div>

              <div className="flex flex-col justify-between text-left w-full md:w-[400px] lg:w-[490px]">
                <div className="space-y-4 lg:space-y-5  ">
                  <p className="text-[10px] md:text-[13px] lg:text-[14px] text-[#9C9C9C] font-[500]">Category</p>
                  <p className="text-[15px] md:text-[22px] lg:text-[24px]">{currentProduct.title}</p>
                  <p
                    className="text-[11px] md:text-[14px] lg:text-[16px] overflow-hidden text-ellipsis"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 5, // number of lines to show before truncating
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {currentProduct.description}
                  </p>
                </div>
                <div className="space-y-3 lg:space-y-2">
                  <p className="pt-4 lg:pt-6 pb-3 text-[11px] md:text-[15px] lg:text-[16px] text-[#9C9C9C] font-[500]">Technology</p>
                  <div className="flex gap-7 md:gap-8 lg:gap-15 pl-4 lg:pl-6">
                    {currentProduct.technologies?.map((tech, index) => (
                      <img
                        key={index}
                        src={techIcons[tech]}
                        alt={tech}
                        className="w-6 md:w-8 lg:w-10 h-full"
                      />
                    ))}
                  </div>
                  <button className="mt-8 md:mt-8 w-[160px] md:w-[180px] lg:w-[238px] h-[40px] md:h-[45px] lg:h-[56px] rounded-[8px] border hover:bg-white hover:text-black duration-500 text-[13px] md:text-[15px] lg:text-[16px] font-[500]">
                    View Case Study &nbsp; →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {products.length > 1 && (
        <div className="flex justify-center gap-5 pt-10 lg:pt-15">
          <img src={leftarrow} className="w-8 md:w-10 lg:w-auto cursor-pointer" onClick={handlePrev} alt="prev" />
          <img src={rightarrow} className="w-8 md:w-10 lg:w-auto cursor-pointer" onClick={handleNext} alt="next" />
        </div>
      )}
    </div>
  );
}

export default Products;
