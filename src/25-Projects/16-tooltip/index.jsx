import React, { useState } from "react";
import { FiArrowUp, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import Test from "./test";

const ToolTip = () => {
  const [settings, setSettings] = useState({
    position: "top",
    theme: "gradient",
    animation: "fade",
    trigger: "hover",
    delay: 300,
    arrow: true,
    interactive: false,
  });

  const [customContent, setCustomContent] = useState("Custom Content");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const floatAnimation = `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `;

  const features = [
    {
      title: "Dynamic Themes",
      description: "Choose from multiple gradient themes and color schemes",
      icon: "🎨",
    },
    {
      title: "Smart Positioning",
      description: "Automatic positioning based on viewport boundaries",
      icon: "📍",
    },
    {
      title: "Interactive Content",
      description: "Add buttons, forms, and custom components inside tooltips",
      icon: "🖱️",
    },
  ];

  return (
    <div
      className={`min-h-screen p-8 flex flex-col items-center transition-colors duration-300
          ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
              : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
          }`}
    >
      <style>{floatAnimation}</style>
      <style>{`
            @keyframes gradient-x {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes gradient-xy {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 100% 0%; }
            }
            .animate-gradient-x {
              background-size: 200% 200%;
              animation: gradient-x 5s ease infinite;
            }
            .animate-gradient-xy {
              background-size: 400% 400%;
              animation: gradient-xy 10s ease infinite;
            }
          `}</style>

      {/* Dark/Light Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full cursor-pointer backdrop-blur-lg transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800/50 hover:bg-gray-700/50 text-white"
              : "bg-white/50 hover:bg-gray-100/50 text-gray-800"
          } shadow-lg hover:shadow-xl`}
        >
          {isDarkMode ? (
            <FiSun className="w-6 h-6" />
          ) : (
            <FiMoon className="w-6 h-6" />
          )}
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 relative">
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
          Advanced Tooltip System
        </span>
      </h1>

      {/* Configuration Panel */}
      <div
        className={`w-full max-w-4xl rounded-2xl p-8 mb-8 transition-all duration-300
            ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"}
            backdrop-blur-sm shadow-2xl hover:shadow-3xl relative overflow-hidden border ${
              isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 animate-gradient-xy" />

        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <FiSettings className="animate-spin-slow" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tooltip Playground
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["position", "theme", "animation", "trigger", "delay"].map(
              (setting) => (
                <div
                  key={setting}
                  className={`p-4 rounded-xl transition-all ${
                    isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/50"
                  }`}
                >
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    {setting.charAt(0).toUpperCase() + setting.slice(1)}
                  </label>
                  {setting === "delay" ? (
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={settings.delay}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          delay: Number(e.target.value),
                        })
                      }
                      className="w-full mt-2"
                    />
                  ) : (
                    <select
                      className={`w-full p-2 rounded-lg cursor-pointer ${
                        isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                      }`}
                      value={settings[setting]}
                      onChange={(e) =>
                        setSettings({ ...settings, [setting]: e.target.value })
                      }
                    >
                      {{
                        position: ["top", "bottom", "left", "right"],
                        theme: [
                          "dark",
                          "light",
                          "gradient",
                          "cyan",
                          "sunset",
                          "primary",
                          "success",
                          "danger",
                        ],
                        animation: [
                          "fade",
                          "slideUp",
                          "bounce",
                          "scale",
                          "float",
                        ],
                        trigger: ["hover", "click", "focus"],
                      }[setting].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )
            )}

            <div className="col-span-full grid grid-cols-2 gap-4 p-4">
              {["arrow", "interactive"].map((toggle) => (
                <label
                  key={toggle}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                        ${
                          isDarkMode
                            ? "hover:bg-gray-700/50"
                            : "hover:bg-gray-100/50"
                        }`}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings[toggle]}
                      onChange={(e) =>
                        setSettings({ ...settings, [toggle]: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${
                        settings[toggle]
                          ? "bg-purple-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition
                          ${
                            settings[toggle] ? "translate-x-5" : "translate-x-1"
                          } top-1`}
                    />
                  </div>
                  <span className="font-medium">
                    {toggle.charAt(0).toUpperCase() + toggle.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Test
              {...settings}
              content={
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Live Preview</h3>
                  <p className="text-xs opacity-75">{customContent}</p>
                  {settings.interactive && (
                    <input
                      type="text"
                      className="mt-2 p-1 text-xs rounded bg-white/10"
                      value={customContent}
                      onChange={(e) => setCustomContent(e.target.value)}
                    />
                  )}
                </div>
              }
            >
              <button
                className={`px-8 py-4 rounded-xl cursor-pointer font-semibold transition-all 
                    ${
                      isDarkMode
                        ? "bg-purple-500/20 hover:bg-purple-500/30"
                        : "bg-purple-100 hover:bg-purple-200"
                    }
                    hover:scale-105 hover:shadow-lg flex items-center gap-2`}
              >
                <FiArrowUp className="animate-bounce" />
                Hover Me!
              </button>
            </Test>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800/50" : "bg-white/90"
            } backdrop-blur-sm shadow-lg hover:shadow-xl group relative overflow-hidden border ${
              isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 animate-gradient-xy opacity-10" />

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span
                  className={`p-2 rounded-lg ${
                    isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                  }`}
                >
                  {feature.icon}
                </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {feature.title}
                </span>
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolTip;
