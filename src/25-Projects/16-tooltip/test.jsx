import React, { useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

const Test = ({
  position = "top",
  content,
  children,
  delay = 100,
  animation = "fade",
  theme = "gradient",
  trigger = "hover",
  arrow = true,
  interactive = false,
  onShow,
  onHide,
}) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const tooltipRef = useRef(null);

  const showTip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(true);
      setVisible(true);
      onShow?.();
    }, delay);
  };

  const hideTip = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
    timeoutRef.current = setTimeout(() => {
      setActive(false);
      onHide?.();
    }, 200);
  };

  useEffect(() => {
    if (trigger === "click" && active) {
      const handleClickOutside = (e) => {
        if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
          hideTip();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [active, trigger]);

  const handleClick = () => {
    if (trigger === "click") {
      active ? hideTip() : showTip();
    }
  };

  const events = {
    hover: { onMouseEnter: showTip, onMouseLeave: hideTip },
    click: { onClick: handleClick },
    focus: { onFocus: showTip, onBlur: hideTip },
  };

  const animations = {
    fade: "opacity-0 scale-95",
    slideUp: "translate-y-2",
    bounce: "animate-bounce",
    scale: "scale-0",
    float: "animate-float",
    neon: "shadow-glow",
  };

  const themes = {
    dark: "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white",
    light:
      "bg-gradient-to-br from-white via-gray-50 to-white text-gray-800 shadow-xl",
    primary:
      "bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white",
    success:
      "bg-gradient-to-br from-green-500 via-green-400 to-green-600 text-white",
    danger: "bg-gradient-to-br from-red-500 via-red-400 to-red-600 text-white",
    gradient:
      "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white",
    cyan: "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white",
    sunset:
      "bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 text-white",
  };

  return (
    <div className="relative inline-block" {...events[trigger]}>
      {children}
      {active && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-4 py-3 text-sm rounded-xl transition-all duration-200 
            backdrop-blur-sm ${themes[theme]} ${animations[animation]} 
            ${visible ? "opacity-100 scale-100" : animations[animation]}
            ${
              position === "top"
                ? "bottom-full left-1/2 -translate-x-1/2 mb-3"
                : position === "bottom"
                ? "top-full left-1/2 -translate-x-1/2 mt-3"
                : position === "left"
                ? "right-full top-1/2 -translate-y-1/2 mr-3"
                : position === "right"
                ? "left-full top-1/2 -translate-y-1/2 ml-3"
                : ""
            }
            hover:scale-105 hover:shadow-lg cursor-pointer`}
          style={{
            minWidth: "140px",
            transformOrigin:
              position === "top"
                ? "center bottom"
                : position === "bottom"
                ? "center top"
                : position === "left"
                ? "right center"
                : position === "right"
                ? "left center"
                : "center",
          }}
        >
          {arrow && (
            <div
              className={`absolute w-3 h-3 transform rotate-45 
                ${themes[theme].split(" ")[0]} transition-all duration-200
                ${
                  position === "top"
                    ? "-bottom-1 left-1/2 -translate-x-1/2"
                    : position === "bottom"
                    ? "-top-1 left-1/2 -translate-x-1/2"
                    : position === "left"
                    ? "-right-1 top-1/2 -translate-y-1/2"
                    : position === "right"
                    ? "-left-1 top-1/2 -translate-y-1/2"
                    : ""
                }`}
            />
          )}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {typeof content === "function" ? content() : content}
            </div>
            {interactive && (
              <div className="flex gap-2 mt-3">
                <button
                  className="px-2 py-1 text-xs font-semibold bg-white text-black bg-opacity-20 rounded-lg
                    hover:bg-opacity-30 transition-all flex items-center gap-1"
                  onClick={hideTip}
                >
                  <FiCheck /> Confirm
                </button>
                <button
                  className="px-2 py-1 text-xs font-semibold bg-white text-black bg-opacity-20 rounded-lg
                    hover:bg-opacity-30 transition-all flex items-center gap-1"
                  onClick={hideTip}
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
