import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiStar,
  FiLock,
  FiSmile,
  FiX,
} from "react-icons/fi";
import confetti from "canvas-confetti";

const onboardingSteps = [
  {
    title: "Welcome to Our Platform",
    description:
      "Discover amazing features designed to boost your productivity",
    icon: <FiStar className="text-6xl text-yellow-400" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Bank-Level Security",
    description: "Your data is protected with enterprise-grade encryption",
    icon: <FiLock className="text-6xl text-green-400" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Ready to Get Started?",
    description: "Join thousands of satisfied users today",
    icon: <FiSmile className="text-6xl text-orange-400" />,
    color: "from-purple-600 to-indigo-600",
  },
];

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        if (currentStep < onboardingSteps.length - 1) {
          handleNext();
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isHovered]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  const handleNext = () => {
    setDirection(1);
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      triggerConfetti();
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const progressWidth = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br via-30% from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={controls}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl p-8 overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <button
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
          onClick={() => setCurrentStep(onboardingSteps.length - 1)}
        >
          <FiX className="text-2xl" />
        </button>

        <div className="flex justify-between items-center mb-8">
          <div className="w-full bg-white/20 h-2 rounded-full">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="relative h-96">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 100 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0 flex flex-col items-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, { offset, velocity }) => {
                if (Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500) {
                  offset.x > 0 ? handlePrev() : handleNext();
                }
              }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${onboardingSteps[currentStep].color} opacity-20 blur-3xl -z-10`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1 }}
              />

              <div className="relative group">
                <motion.div
                  className={`bg-gradient-to-br ${onboardingSteps[currentStep].color} w-48 h-48 rounded-3xl flex items-center justify-center mb-8 shadow-2xl hover:shadow-3xl transition-shadow`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    {onboardingSteps[currentStep].icon}
                  </motion.div>
                </motion.div>
                <div className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none transition-all group-hover:bg-white/10" />
              </div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold text-center text-white mb-4"
              >
                {onboardingSteps[currentStep].title}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white/80 mb-8 max-w-md"
              >
                {onboardingSteps[currentStep].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center">
          <motion.button
            onClick={handlePrev}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold relative overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-10 transition-opacity" />
            {currentStep === onboardingSteps.length - 1 ? (
              <>
                Get Started
                <FiCheck className="text-xl" />
              </>
            ) : (
              <>
                Next
                <FiArrowRight className="text-xl" />
              </>
            )}
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentStep
                  ? "bg-white scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
