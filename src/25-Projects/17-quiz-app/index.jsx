import { useEffect, useState } from "react";
import {
  FiClock,
  FiHelpCircle,
  FiZap,
  FiBook,
  FiAlertTriangle,
  FiStar,
  FiChevronRight,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import ReactCardFlip from "react-card-flip";
import { useQuizStore } from "./store";
import { quizData } from "./quizData";

function QuizApp() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const {
    currentQuestion,
    score,
    userAnswers,
    lifelines,
    quizStarted,
    quizEnded,
    timeLeft,
    currentQuestions,
    darkMode,
    startQuiz,
    restartQuiz,
    decrementTime,
    endQuiz,
    handleAnswer,
    nextQuestion,
    useFiftyFifty,
    useSkip,
    addTimeBonus,
    toggleDarkMode,
  } = useQuizStore();

  useEffect(() => {
    if (quizStarted && !quizEnded && timeLeft > 0 && !showExplanation) {
      const timer = setInterval(decrementTime, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) endQuiz();
  }, [
    quizStarted,
    quizEnded,
    timeLeft,
    showExplanation,
    decrementTime,
    endQuiz,
  ]);

  const DifficultyBadge = ({ difficulty }) => (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        difficulty === "easy"
          ? "bg-green-500/20 text-green-400"
          : difficulty === "medium"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {difficulty}
    </span>
  );

  const LifelineButton = ({ type, count, icon: Icon, action }) => (
    <button
      onClick={action}
      disabled={count === 0}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
    >
      <Icon className="text-xl" />
      <span>{count}</span>
    </button>
  );

  if (!quizStarted) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`max-w-2xl p-8 rounded-2xl shadow-xl ${
            darkMode ? "bg-gray-800/90" : "bg-white"
          }`}
        >
          <div className="text-center mb-8">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full cursor-pointer ${
                darkMode
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          <h1
            className={`text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent`}
          >
            React Master Quiz
          </h1>
          <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform cursor-pointer"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizEnded) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`max-w-2xl p-8 rounded-2xl shadow-xl ${
            darkMode ? "bg-gray-800/90" : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Quiz Results</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-cyan-500/10">
              <div className="text-2xl font-bold text-cyan-600">{score}</div>
              <div className="text-sm">Score</div>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10">
              <div className="text-2xl font-bold text-green-600">
                {userAnswers.filter((a) => a.isCorrect).length}
              </div>
              <div className="text-sm">Correct</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  (userAnswers.filter((a) => a.isCorrect).length /
                    quizData.length) *
                    100
                )}
                %{" "}
              </div>
              <div className="text-sm">Accuracy</div>
            </div>
          </div>
          <button
            onClick={restartQuiz}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform cursor-pointer"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="container mx-auto px-4 py-8">
        <div
          className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-gray-800/90" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <FiClock
                  className={darkMode ? "text-cyan-400" : "text-cyan-600"}
                />
                <span className="ml-2">{timeLeft}s</span>
              </div>
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <span
                  className={`font-bold ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  {score}
                </span>
                <span className="ml-1">points</span>
              </div>
            </div>
            <div className="flex gap-2">
              <LifelineButton
                type="fiftyFifty"
                count={lifelines.fiftyFifty}
                icon={FiHelpCircle}
                action={useFiftyFifty}
              />
              <LifelineButton
                type="skip"
                count={lifelines.skip}
                icon={FiZap}
                action={useSkip}
              />
            </div>
          </div>

          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  Question {currentQuestion + 1}
                  <DifficultyBadge
                    difficulty={currentQuestions[currentQuestion].difficulty}
                  />
                </h3>
                <span className="text-gray-500">
                  {currentQuestion + 1}/{currentQuestions.length}
                </span>
              </div>

              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {currentQuestions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestions[currentQuestion].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleAnswer(index);
                        setShowExplanation(true);
                        setIsFlipped(true);
                      }}
                      className={`p-3 text-left rounded-lg cursor-pointer transition-all ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className={`font-bold ${
                          darkMode ? "text-cyan-400" : "text-cyan-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="ml-2">{option}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Explanation</h3>
                <button
                  onClick={() => {
                    nextQuestion();
                    setShowExplanation(false);
                    setIsFlipped(false);
                  }}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg ${
                    darkMode ? "bg-cyan-600/20" : "bg-cyan-100"
                  }`}
                >
                  Continue <FiChevronRight />
                </button>
              </div>

              <div
                className={`text-lg ${
                  userAnswers[currentQuestion]?.isCorrect
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {userAnswers[currentQuestion]?.isCorrect
                  ? "✓ Correct!"
                  : "✗ Incorrect"}
              </div>

              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {currentQuestions[currentQuestion].explanation}
              </p>
            </div>
          </ReactCardFlip>
        </div>
      </div>
    </div>
  );
}

export default QuizApp;
