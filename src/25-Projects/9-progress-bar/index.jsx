import { useState } from "react";

function ProgressBar() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleProgressPercentage = (event) => {
    const value = Math.min(Math.max(Number(event.target.value), 0), 100);
    setProgressPercent(value);

    if (value > 100) {
      setErrorMsg("Percentage cannot exceed 100%");
    } else if (value < 0) {
      setErrorMsg("Percentage cannot be less than 0%");
    } else {
      setErrorMsg("");
    }
  };

  const getProgressColor = () => {
    if (progressPercent === 100) return "bg-green-500";
    if (progressPercent > 75) return "bg-blue-500";
    if (progressPercent > 50) return "bg-purple-500";
    if (progressPercent > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleIncrement = (value) => {
    setProgressPercent((prev) => Math.min(prev + value, 100));
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Custom Progress Bar
        </h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <div
              className="w-full h-6 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()} 
                  flex items-center justify-end pr-2 text-white font-medium text-sm`}
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              >
                {progressPercent >= 20 && `${Math.round(progressPercent)}%`}
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Progress: {Math.round(progressPercent)}%
            </p>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              ⚠️ {errorMsg}
            </p>
          )}

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Set Percentage:
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={progressPercent}
                onChange={handleProgressPercentage}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="0-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleIncrement(-10)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                disabled={progressPercent <= 0}
              >
                -10%
              </button>
              <button
                onClick={() => handleIncrement(10)}
                className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors cursor-pointer"
                disabled={progressPercent >= 100}
              >
                +10%
              </button>
            </div>

            <button
              onClick={() => {
                setProgressPercent(0);
                setErrorMsg("");
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
