import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiCheck, FiAlertCircle } from "react-icons/fi";

const FloatingInput = forwardRef(
  (
    { icon, label, type = "text", error, showPassword, toggleShow, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value?.length > 0;

    return (
      <motion.div className="relative mb-6 group" whileHover={{ scale: 1.02 }}>
        <div
          className={`relative flex items-center rounded-xl transition-all p-3 h-14
            ${
              error
                ? "bg-red-100 border-2 border-red-400"
                : "bg-gray-100 border-2 border-transparent"
            } 
          `}
        >
          <span className="text-xl">{icon}</span>
          <input
            ref={ref}
            {...props}
            type={type}
            className="w-full py-2 px-3 bg-transparent outline-none placeholder-transparent text-gray-800 font-medium"
            placeholder={label}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {props.name === "password" && (
            <button type="button" onClick={toggleShow}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}

          <AnimatePresence>
            {!error && hasValue && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <FiCheck className="text-green-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600"
            >
              <FiAlertCircle className="mr-1" /> {error.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

export default FloatingInput;
