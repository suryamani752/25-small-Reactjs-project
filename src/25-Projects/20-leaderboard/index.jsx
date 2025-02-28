import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  ArrowUpOnSquareIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ReactCountryFlag from "react-country-flag";
import Confetti from "react-confetti";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";

Chart.register(...registerables);

const initialUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    points: 4500,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fluffy",
    country: "IN",
    achievements: ["🏆 First Place", "🚀 Fast Riser"],
    progressHistory: [2000, 3200, 4500],
  },
  {
    id: 2,
    name: "Priya Singh",
    points: 4200,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Whiskers",
    country: "US",
    achievements: ["🥈 Silver Medal"],
    progressHistory: [3000, 3800, 4200],
  },
  {
    id: 3,
    name: "Amit Patel",
    points: 3900,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simba",
    country: "GB",
    achievements: ["📈 Most Improved"],
    progressHistory: [2500, 3200, 3900],
  },
];

const LeaderBoard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Theme toggle function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    let sorted = [...initialUsers];
    if (sortBy === "points") sorted.sort((a, b) => b.points - a.points);
    else if (sortBy === "name")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => a.id - b.id);
    setUsers(sorted);
  }, [sortBy]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "top" && user.points > 4000) ||
      (activeTab === "rising" && user.points > 3000 && user.points < 4000);
    return matchesSearch && matchesTab;
  });

  const openProfileModal = (user) => {
    setSelectedUser(user);
    if (user.points > 4000) setShowConfetti(true);
  };

  const shareProfile = () => {
    navigator.share({
      title: `${selectedUser.name}'s Profile`,
      text: `Check out ${selectedUser.name}'s ranking on Leaderboard!`,
      url: window.location.href,
    });
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {showConfetti && (
        <Confetti
          {...windowSize}
          recycle={false}
          numberOfPieces={400}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TrophyIcon className="h-12 w-12 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Global Leaderboard
            </h1>
          </motion.div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors cursor-pointer"
          >
            {darkMode ? (
              <SunIcon className="h-8 w-8 text-yellow-400" />
            ) : (
              <MoonIcon className="h-8 w-8 text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "top", "rising"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full cursor-pointer transition-all ${
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border-2 pl-10`}
            />
            <MagnifyingGlassIcon
              className={`h-5 w-5 absolute left-3 top-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <Menu>
              <Menu.Button
                className={`w-full p-3 rounded-lg flex justify-between items-center cursor-pointer ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                } border-2 transition-colors`}
              >
                <span>
                  {sortBy === "rank" && "Sort by Rank"}
                  {sortBy === "points" && "Sort by Points"}
                  {sortBy === "name" && "Sort by Name"}
                </span>
                <ChevronUpDownIcon
                  className={`h-5 w-5 ml-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </Menu.Button>

              <Menu.Items
                className={`absolute w-full mt-2 rounded-lg shadow-lg z-50 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border-2`}
              >
                <div className="p-2 space-y-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("rank")}
                        className={`w-full text-left px-4 py-2 rounded-md cursor-pointer ${
                          active && (darkMode ? "bg-gray-700" : "bg-gray-100")
                        } ${
                          sortBy === "rank"
                            ? "text-purple-500 font-semibold"
                            : darkMode
                            ? "text-gray-300"
                            : "text-gray-900"
                        }`}
                      >
                        Sort by Rank
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("points")}
                        className={`w-full text-left px-4 py-2 rounded-md cursor-pointer ${
                          active && (darkMode ? "bg-gray-700" : "bg-gray-100")
                        } ${
                          sortBy === "points"
                            ? "text-purple-500 font-semibold"
                            : darkMode
                            ? "text-gray-300"
                            : "text-gray-900"
                        }`}
                      >
                        Sort by Points
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("name")}
                        className={`w-full text-left px-4 py-2 rounded-md cursor-pointer ${
                          active && (darkMode ? "bg-gray-700" : "bg-gray-100")
                        } ${
                          sortBy === "name"
                            ? "text-purple-500 font-semibold"
                            : darkMode
                            ? "text-gray-300"
                            : "text-gray-900"
                        }`}
                      >
                        Sort by Name
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        <div className="grid gap-4">
          <AnimatePresence>
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-white hover:bg-gray-50"
                } cursor-pointer relative group`}
                onClick={() => openProfileModal(user)}
              >
                {index < 3 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl" />
                )}

                <div className="flex items-center gap-6 relative">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-full ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : index === 1
                        ? "bg-gradient-to-br from-gray-300 to-blue-400"
                        : index === 2
                        ? "bg-gradient-to-br from-orange-400 to-red-500"
                        : darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  >
                    <span className="text-xl font-bold">#{index + 1}</span>
                  </div>

                  <ReactCountryFlag
                    countryCode={user.country}
                    svg
                    style={{
                      width: "32px",
                      height: "32px",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full border-4 border-purple-500 hover:border-pink-500 transition-all"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <div className="flex items-center gap-2">
                          {user.achievements.map((ach, i) => (
                            <span
                              key={i}
                              className="text-sm px-2 py-1 rounded-full bg-purple-500/20 text-purple-500"
                            >
                              {ach}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {((user.points / 5000) * 100).toFixed(1)}% to Next
                          Level
                        </span>
                        <span className="font-bold text-purple-500">
                          {user.points.toLocaleString()} XP
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                          style={{ width: `${(user.points / 5000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`relative rounded-2xl p-8 max-w-2xl w-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 hover:text-red-600 rounded-full cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center space-y-4">
                <img
                  src={selectedUser.avatar}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-purple-500"
                />
                <h2 className="text-3xl font-bold">{selectedUser.name}</h2>
                <ReactCountryFlag
                  countryCode={selectedUser.country}
                  svg
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                  }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="text-2xl font-bold text-purple-500">
                      {selectedUser.points.toLocaleString()}
                    </div>
                    <div className="text-sm">Total XP</div>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="text-2xl font-bold text-pink-500">
                      #{users.findIndex((u) => u.id === selectedUser.id) + 1}
                    </div>
                    <div className="text-sm">Global Rank</div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <Line
                    data={{
                      labels: ["1 Month Ago", "2 Weeks Ago", "Current"],
                      datasets: [
                        {
                          label: "XP Progress",
                          data: selectedUser.progressHistory,
                          borderColor: "#8B5CF6",
                          tension: 0.3,
                        },
                      ],
                    }}
                  />
                </div>

                <button
                  onClick={shareProfile}
                  className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowUpOnSquareIcon className="w-5 h-5" />
                  Share Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg cursor-pointer ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-white hover:bg-gray-100"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpIcon className="h-6 w-6 text-purple-500" />
        </motion.button>
      </div>
    </div>
  );
};

export default LeaderBoard;
