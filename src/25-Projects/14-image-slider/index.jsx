import { useEffect, useState } from "react";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsPlayFill,
  BsPauseFill,
} from "react-icons/bs";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [dragStart, setDragStart] = useState(0);
  const [progress, setProgress] = useState(0);
  const url = "https://dummyjson.com/products?limit=10";

  async function fetchImages() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(data.products.slice(0, 10));
    } catch (e) {
      console.error("Error fetching images:", e);
    }
  }

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const handleDragStart = (e) => {
    setDragStart(e.clientX || e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    const endX = e.clientX || e.changedTouches[0].clientX;
    const diff = dragStart - endX;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrevious();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    let interval;
    let progressInterval;

    if (autoPlay) {
      interval = setInterval(handleNext, 5000);
      progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 500);
    }
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [autoPlay, currentSlide]);

  if (!images.length)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-2xl text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Loading Stellar Products...
        </div>
      </div>
    );

  return (
    <div className="relative max-w-6xl mx-auto group min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Auto Play Button */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-8 right-8 z-50 text-white bg-black/30 p-3 rounded-full 
        hover:bg-black/50 transition-all duration-300 backdrop-blur-lg shadow-2xl
        flex items-center justify-center"
      >
        {autoPlay ? (
          <BsPauseFill
            size={28}
            className="hover:scale-110 transition-transform"
          />
        ) : (
          <BsPlayFill
            size={28}
            className="hover:scale-110 transition-transform"
          />
        )}
      </button>

      {/* Progress Bar */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 3D Carousel Container */}
      <div
        className="relative h-[600px] w-full perspective-[2000px] flex items-center justify-center"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {images.map((product, index) => {
          const angle = (index - currentSlide) * (360 / images.length);
          const absAngle = Math.abs(angle % 360);
          const isActive = absAngle < 45 || absAngle > 315;

          return (
            <div
              key={product.id}
              className="absolute w-80 h-80 transition-all duration-1000 origin-center"
              style={{
                transform: `rotateY(${angle}deg) translateZ(600px)`,
                filter: `brightness(${isActive ? 1 : 0.5}) 
                         saturate(${isActive ? 1.2 : 0.7})
                         blur(${isActive ? "0px" : "6px"})`,
                scale: isActive ? "1" : "0.7",
                zIndex: isActive ? 1 : 0,
              }}
            >
              <div className="relative w-full h-full transform-style-preserve-3d group/card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={`w-full h-full object-cover rounded-2xl shadow-2xl border-4 
                    ${isActive ? "border-cyan-400" : "border-white/20"} 
                    transition-all duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-z-40 space-y-1">
                  <h3
                    className={`text-2xl font-bold line-clamp-1 text-left 
                    ${isActive ? "text-cyan-400" : "text-gray-300"}`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`font-semibold text-left 
                    ${isActive ? "text-white" : "text-gray-400"}`}
                  >
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
        <BsArrowLeftCircle
          onClick={handlePrevious}
          className="text-white text-5xl cursor-pointer 
            opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg 
            rounded-full p-2 bg-black/30 hover:bg-black/50 hover:scale-125 pointer-events-auto"
        />
        <BsArrowRightCircle
          onClick={handleNext}
          className="text-white text-5xl cursor-pointer 
            opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg 
            rounded-full p-2 bg-black/30 hover:bg-black/50 hover:scale-125 pointer-events-auto"
        />
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gradient-to-br from-cyan-400 to-blue-600 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
